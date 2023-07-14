const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app12 = express.Router();
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./routes/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage,
})
app12.use(bodyParser.json());
app12.route('/')
.get((req,res)=>{
    conn.query('select * from percentageof_highereducation_students',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post(upload.single('image'),(req,res)=>{
    const {NameOfTeacher} = req.body;
    const {NumberOf_Students_Enrolled} = req.body;
    const {Name_Of_Students} = req.body;
    const {Program_Graduated_From} = req.body;
    const {Name_Of_Institution_joined} = req.body;
    const {Name_Of_Programme_Admitted_To} = req.body;
    const IdentityCardORAdmissionLetter = req.file.filename;
    conn.query('insert into percentageof_highereducation_students SET ?',{
        NameOfTeacher:NameOfTeacher,
        NumberOf_Students_Enrolled:NumberOf_Students_Enrolled,
        Name_Of_Students:Name_Of_Students,
        Program_Graduated_From:Program_Graduated_From,
        Name_Of_Institution_joined:Name_Of_Institution_joined,
        Name_Of_Programme_Admitted_To:Name_Of_Programme_Admitted_To,
        IdentityCardORAdmissionLetter:IdentityCardORAdmissionLetter
    },(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
           conn.query('select NameOfTeacher, count(*) as count from percentageof_highereducation_students group by NameOfTeacher',(err,rows)=>{
            if(err){
                console.log(err)
            }else{
                const resRows = rows;
                resRows?.forEach(element => {
                    let teacher = "'"+element?.NameOfTeacher+"'";
                    conn.query(`update percentageof_highereducation_students set NumberOf_Students_Enrolled=${element?.count} where NameOfTeacher = ${teacher}`,(err,rows)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(rows);
                        }
                    })
                });
            }
           })
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table percentageof_highereducation_students',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app12.route('/:teacher')
.get((req,res)=>{
    conn.query('select * from percentageof_highereducation_students where NameOfTeacher = ?',[req.params.teacher],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from percentageof_highereducation_students where NameOfTeacher= ?',[req.params.teacher],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.teacher+' deleted');
          }
       });
})
   
.put((req,res)=>{
    var con ='"' +req.params.teacher+'"';
    var bt = req.body
    conn.query('update percentageof_highereducation_students set ? where NameOfTeacher ='+con,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});
app12.get('/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(err);
        res.status(404).send('File not found');
        return;
      }
      res.download(filePath,filename, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal server error');
        }
      });
    });
});
app12.get('/open/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);
  
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(err);
        res.status(404).send('File not found');
        return;
      }
  
      const fileStream = fs.createReadStream(filePath);
      res.setHeader('Content-Type', 'application/pdf');
      fileStream.pipe(res);
    });
});
module.exports = app12;