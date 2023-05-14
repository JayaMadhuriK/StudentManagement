const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app1 = express.Router();

app1.use(bodyParser.json());
app1.route('/')
.get((req,res)=>{
    conn.query('select * from btech_details',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.University_RollNumber,bt.First_Name,bt.Last_Name,bt.Gender,bt.Nationality,bt.DOB,bt.Phone_Number,bt.Email_ID,bt.ADHAR_Number,bt.Address,bt.District,bt.State,bt.Country,bt.Pin_Code,bt.Category,bt.Sub_Category,bt._10th_CGPA,bt._10th_Board,bt._10th_YOP,bt._12th_Percentage,bt._12th_Board,bt._12th_YOP,bt.Diploma_Percentage,bt.Diploma_Board,bt.Diploma_YOP,bt.Course_RegularORIntegrated,bt.Branch,bt.College_Name,bt.Course_CGPA,bt.Number_Of_Backlogs,bt.Entrance_Exam,bt.CET_Rank,bt.Course_YOP];
    conn.query('insert into btech_details values(?)',[btData],(err,rows)=>{
       if(err){
           res.sendStatus(400);
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table btech_details',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app1.route('/:University_RollNumber')
.get((req,res)=>{
    conn.query('select * from btech_details where University_RollNumber = ?',[req.params.University_RollNumber],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from btech_details where University_RollNumber = ?',[req.params.University_RollNumber],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.University_RollNumber+' deleted');
          }
       });
})
   
.put((req,res)=>{
       var bt = req.body
       conn.query('update btech_details set ? where University_RollNumber = '+req.params.University_RollNumber,[bt],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
          
               res.send("Details updated");
           }
       
         })
});

module.exports = app1;
   