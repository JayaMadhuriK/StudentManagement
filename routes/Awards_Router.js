const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app10 = express();
app10.use(bodyParser.json());

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


app10.route('/')
.get((req,res)=>{
    conn.query('select * from no_of_awards_wonbystudents',(err,rows)=>{
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
    const {Name_Of_Award} = req.body;
    const {TeamORIndividual} = req.body;
    const {InterUniversity_State_National_International} = req.body;
    const {Name_Of_Event} = req.body;
    const {Name_Of_Student} = req.body;
    const {University_RollNumber} = req.body;
    const E_Copy_Of_Award_Letter = req.file.filename;
    conn.query('insert into no_of_awards_wonbystudents SET ?',
    {
        Id:Id,
        Year:Year,
        Name_Of_Award:Name_Of_Award,
        TeamORIndividual:TeamORIndividual,
        InterUniversity_State_National_International:InterUniversity_State_National_International,
        Name_Of_Event:Name_Of_Event,
        Name_Of_Student:Name_Of_Student,
        University_RollNumber:University_RollNumber,
        E_Copy_Of_Award_Letter:E_Copy_Of_Award_Letter
    }
    ,(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table no_of_awards_wonbystudents',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app10.route('/:Id')
.get((req,res)=>{
    conn.query('select * from no_of_awards_wonbystudents where Id = ?',[req.params.Id],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from no_of_awards_wonbystudents where Id= ?',[req.params.Id],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.Id+' deleted');
          }
       });
})
   
.put(upload.single('image'),(req,res)=>{
   const {
    Year,
    Name_Of_Award,
    TeamORIndividual,
    InterUniversity_State_National_International,
    Name_Of_Event,
    Name_Of_Student,
    University_RollNumber,
   } = req.body;
   const E_Copy_Of_Award_Letter = req.file ? req.file.filename : null;
    const updateData = {
        Year,
    Name_Of_Award,
    TeamORIndividual,
    InterUniversity_State_National_International,
    Name_Of_Event,
    Name_Of_Student,
    University_RollNumber,
    };
    if (E_Copy_Of_Award_Letter) {
        updateData.E_Copy_Of_Award_Letter = E_Copy_Of_Award_Letter;
    }
    conn.query('update no_of_awards_wonbystudents set ? where Id = '+req.params.Id,[updateData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});
app10.get('/download/:filename', (req, res) => {
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
app10.get('/open/:filename', (req, res) => {
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


module.exports = app10;