const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app11 = express.Router();

app11.use(bodyParser.json());
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

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Program_Name,bt.Program_Code,bt.list_of_students_undertakig_field_projects_researchs_internships,bt.link_to_relevant_documents];
    conn.query('insert into percentage_students_undertaking_internships_projects values(?)',[btData],(err,rows)=>{
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