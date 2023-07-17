const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app20 = express.Router();
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
app20.use(bodyParser.json());
app20.route('/')
.get((req,res)=>{
    conn.query('select * from examinations where year!=""',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.year,bt.Registeration_Number,bt.NET,bt.SLET,bt.GATE,bt.GMAT,bt.CAT,bt.GRE,bt.JAM,bt.IELET,bt.TOEFL,bt.Civil_Services,bt.State_government,bt.Other_examinations];
    conn.query('insert into examinations values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table examinations',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app20.route('/:code')
.get((req,res)=>{
    conn.query('select * from examinations where Registeration_Number = ?',[req.params.code],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from examinations where Registeration_Number= ?',[req.params.code],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.code+' deleted');
          }
       });
})
   
.put(upload.single('image'),(req,res)=>{
    const {
        year,
        Registeration_Number ,
        NET ,
        SLET ,
        GATE ,
        GMAT ,
        CAT ,
        GRE ,
        JAM ,
        IELET ,
        TOEFL ,
        Civil_Services ,
        State_government ,
        Other_examinations ,
       } = req.body;
       const ExamFile = req.file ? req.file.filename : null;
       const updateData = {
        year,
        Registeration_Number ,
        NET ,
        SLET ,
        GATE ,
        GMAT ,
        CAT ,
        GRE ,
        JAM ,
        IELET ,
        TOEFL ,
        Civil_Services ,
        State_government ,
        Other_examinations ,
       };
       if (ExamFile) {
           updateData.ExamFile = ExamFile;
       }
    conn.query('update examinations set ? where Registeration_Number ='+req.params.code,[updateData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});
app20.get('/download/:filename', (req, res) => {
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
app20.get('/open/:filename', (req, res) => {
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
module.exports = app20;
   