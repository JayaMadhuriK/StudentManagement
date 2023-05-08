const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const xlsx = require('xlsx');
const dbPool =require ('../database');
const app15 = express.Router();

app15.use(bodyParser.json());
app15.route('/')
.get((req,res)=>{
    conn.query('select * from student_satisfactory_survey',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Name_of_Student,bt.Gender,bt.Category,bt.State_of_domicille,bt.Nationality_if_other_than_india,bt.Email_ID,bt.Program_Name,bt.Student_Unique_Enrollment,bt.mobile_number,bt.Year_of_joining];
    conn.query('insert into student_satisfactory_survey values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table student_satisfactory_survey',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app15.route('/:roll')
.get((req,res)=>{
    conn.query('select * from student_satisfactory_survey where Student_Unique_Enrollment = ?',[req.params.roll],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from student_satisfactory_survey where Student_Unique_Enrollment= ?',[req.params.roll],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.roll+' deleted');
          }
       });
})
   
.put((req,res)=>{
  
    var bt = req.body
    conn.query('update student_satisfactory_survey set ? where Student_Unique_Enrollment ='+req.params.roll,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
}); 

module.exports = app15;