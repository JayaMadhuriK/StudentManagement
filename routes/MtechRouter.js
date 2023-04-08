const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app2 = express.Router();

app2.use(bodyParser.json());
app2.route('/')
.get((req,res)=>{
    conn.query('select * from mtech',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.University_RollNumber,bt.First_Name,bt.Last_Name,bt.Gender,bt.Nationality,bt.DOB,bt.Phone_Number,bt.Email_ID,bt.ADHAR_Number,bt.Address,bt.District,bt.State,bt.Country,bt.Pin_Code,bt.Category,bt.Sub_Category,bt._10th_CGPA,bt._10th_Board,bt._10th_YOP,bt._12th_Percentage,bt._12th_Board,bt._12th_YOP,bt.Diploma_Percentage,bt.Diploma_Board,bt.Diploma_YOP,bt.DegreeCourse,bt.Branch,bt.College_Name,bt.Course_CGPA,bt.Number_Of_Backlogs,bt.Entrance_Exam,bt.CET_Rank,bt.Course_YOP,bt.MTECH_College,bt.Department,bt.MTECH_Specialization,bt.MTECH_NumberOF_Backlogs,bt.MTECH_CGPA];
    conn.query('insert into mtech values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('Inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table mtech',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app2.route('/:University_RollNumber')
.get((req,res)=>{
    conn.query('select * from mtech where University_RollNumber = ?',[req.params.University_RollNumber],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from mtech where University_RollNumber = ?',[req.params.University_RollNumber],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.University_RollNumber+' deleted');
          }
       });
})
   
.patch((req,res)=>{
       var bt = req.body
       conn.query('update mtech set ? where University_RollNumber = '+req.params.University_RollNumber,[bt],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
          
               res.send("Details updated");
           }
       
         })
});

module.exports = app2;
   