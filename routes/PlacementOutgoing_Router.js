const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app4 = express.Router();
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
});

app4.use(bodyParser.json());
app4.route('/')
.get((req,res)=>{
    conn.query('select * from avg_percentage_placement_outgoingstudents_lastfiveyears where Year!="" and Name_of_the_Teacher!="" ',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post(upload.single('image'),(req,res)=>{
    const {Id} = req.body;
    const {Year} = req.body;
    const {Name_of_the_Teacher} = req.body;
    const {NumberOfStudentsGuided} = req.body;
    const {Contact_Details} = req.body;
    const {Program_graduated_from} = req.body;
    const {Name_of_company} = req.body;
    const {Name_of_employer_with_contact_details} = req.body;
    const {Pay_package_at_appointment} = req.body;
    const PlaceFile = req.file.filename;
    conn.query('insert into avg_percentage_placement_outgoingstudents_lastfiveyears SET ?',{
        Id:Id,
        Year:Year,
        Name_of_the_Teacher:Name_of_the_Teacher,
        NumberOfStudentsGuided:NumberOfStudentsGuided,
        Contact_Details:Contact_Details,
        Program_graduated_from:Program_graduated_from,
        Name_of_company:Name_of_company,
        Name_of_employer_with_contact_details:Name_of_employer_with_contact_details,
        Pay_package_at_appointment:Pay_package_at_appointment,
        PlaceFile:PlaceFile
    },(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
           conn.query('select Name_of_the_Teacher, count(*) as count from avg_percentage_placement_outgoingstudents_lastfiveyears group by Name_of_the_Teacher',(err,rows)=>{
            if(err){
                console.log(err);
            }else{
                const resRows = rows;
                resRows?.forEach(element => {
                    let teacher = "'"+element?.Name_of_the_Teacher+"'";
                    conn.query(`update avg_percentage_placement_outgoingstudents_lastfiveyears set NumberOfStudentsGuided=${element?.count} where Name_of_the_Teacher = ${teacher}`,(err,rows)=>{
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
    conn.query('truncate table avg_percentage_placement_outgoingstudents_lastfiveyears',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app4.route('/:Id')
.get((req,res)=>{
    conn.query('select * from avg_percentage_placement_outgoingstudents_lastfiveyears where Id = ?',[req.params.Id],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from avg_percentage_placement_outgoingstudents_lastfiveyears where Id= ?',[req.params.Id],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.Id+' deleted');
          }
       });
})
   
.put(upload.single('image'),(req,res)=>{
    const {
        Id  ,
        Year  ,
        Name_of_the_Teacher  ,
        Contact_Details  ,
        Program_graduated_from  ,
        Name_of_company  ,
        Name_of_employer_with_contact_details  ,
        Pay_package_at_appointment  
          
       } = req.body;
       const PlaceFile = req.file ? req.file.filename : null;
       const updateData = {
        Id  ,
        Year  ,
        Name_of_the_Teacher  ,
        Contact_Details  ,
        Program_graduated_from  ,
        Name_of_company  ,
        Name_of_employer_with_contact_details  ,
        Pay_package_at_appointment  
          
       };
       if (PlaceFile) {
           updateData.PlaceFile = PlaceFile;
       }
    conn.query('update avg_percentage_placement_outgoingstudents_lastfiveyears set ? where Id = '+req.params.Id,[updateData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
        conn.query('select Name_of_the_Teacher, count(*) as count from avg_percentage_placement_outgoingstudents_lastfiveyears group by Name_of_the_Teacher',(err,rows)=>{
            if(err){
                console.log(err);
            }else{
                const resRows = rows;
                if (Array.isArray(resRows)) {
                resRows?.forEach(element => {
                    let teacher = "'"+element?.Name_of_the_Teacher+"'";
                    conn.query(`update avg_percentage_placement_outgoingstudents_lastfiveyears set NumberOfStudentsGuided=${element?.count} where Name_of_the_Teacher = ${teacher}`,(err,rows)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(rows);
                        }
                    });
                });
                }
            }
           });

        }
    
      })
});

app4.get('/download/:filename', (req, res) => {
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
app4.get('/open/:filename', (req, res) => {
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


module.exports = app4;
   