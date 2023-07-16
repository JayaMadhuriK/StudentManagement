const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const app11 = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
app11.use(bodyParser.json());
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
app11.route('/')
.get((req,res)=>{
    conn.query('select * from percentage_students_undertaking_internships_projects',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post(upload.single('image'),(req,res)=>{
    const {Id} = req.body;
    const {Program_name} = req.body;
    const {Program_code} = req.body;
    const {list_of_students_undertakig_field_projects_researchs_internships} = req.body;
    const link_to_relevant_documents = req.file.filename;
    conn.query('insert into percentage_students_undertaking_internships_projects SET ?',{
        Id:Id,
        Program_name:Program_name,
        Program_code:Program_code,
        list_of_students_undertakig_field_projects_researchs_internships:list_of_students_undertakig_field_projects_researchs_internships,
        link_to_relevant_documents:link_to_relevant_documents
    },(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table percentage_students_undertaking_internships_projects',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app11.route('/:Id')
.get((req,res)=>{
    conn.query('select * from percentage_students_undertaking_internships_projects where Id = ?',[req.params.Id],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from percentage_students_undertaking_internships_projects where Id= ?',[req.params.Id],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.Id+' deleted');
          }
       });
})
   
.put((req,res)=>{
   
    var bt = req.body
    conn.query('update percentage_students_undertaking_internships_projects set ? where Id ='+req.params.Id,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

app11.get('/download/:filename', (req, res) => {
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
app11.get('/open/:filename', (req, res) => {
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


module.exports = app11;