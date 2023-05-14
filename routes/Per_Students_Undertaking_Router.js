const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const app11 = express.Router();
const multer = require('multer');
const path = require('path');
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
    // var bt = req.body;
    // var btData = [bt.Program_Name,bt.Program_Code,bt.list_of_students_undertakig_field_projects_researchs_internships,bt.link_to_relevant_documents];
    const {Program_Name} = req.body;
    const {Program_Code} = req.body;
    const {list_of_students_undertakig_field_projects_researchs_internships} = req.body;
    const link_to_relevant_documents = req.file.filename;
    conn.query('insert into percentage_students_undertaking_internships_projects SET ?',{
        Program_Name:Program_Name,
        Program_Code:Program_Code,
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

app11.route('/:code')
.get((req,res)=>{
    conn.query('select * from percentage_students_undertaking_internships_projects where Program_Code = ?',[req.params.code],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from percentage_students_undertaking_internships_projects where Program_Code= ?',[req.params.code],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.code+' deleted');
          }
       });
})
   
.put((req,res)=>{
   
    var bt = req.body
    conn.query('update percentage_students_undertaking_internships_projects set ? where Program_Code ='+req.params.code,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});



module.exports = app11;