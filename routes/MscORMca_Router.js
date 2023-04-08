const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app3 = express.Router();

app3.use(bodyParser.json());
app3.route('/')
.get((req,res)=>{
    conn.query('select * from msc_or_mca',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.University_RollNumber,bt.First_Name,bt.Last_Name,bt.Gender,bt.Nationality,bt.DOB,bt.Phone_Number,bt.Email_ID,bt.ADHAR_Number,bt.Address,bt.District,bt.State,bt.Country,bt.Pin_Code,bt.Category,bt.Sub_Category,bt._10th_CGPA,bt._10th_Board,bt._10th_YOP,bt._12th_Percentage,bt._12th_Board,bt._12th_YOP,bt.Degree,bt.Degree_Specialization,bt.Degree_Score,bt.Degree_University,bt.Degree_College,bt.Degree_YOP,bt.MSC_OR_MCA,bt.Course_Branch,bt.College,bt.Entrance_CET,bt.CET_Rank,bt.MSC_OR_MCA_CGPA,bt.Number_Of_Backlogs];
    conn.query('insert into msc_or_mca values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table msc_or_mca',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});
app3.route('/:University_RollNumber')
.get((req,res)=>{
    conn.query('select * from msc_or_mca where University_RollNumber = ?',[req.params.University_RollNumber],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from msc_or_mca where University_RollNumber = ?',[req.params.University_RollNumber],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.University_RollNumber+' deleted');
          }
       });
})
   
.patch((req,res)=>{
       var bt = req.body
       conn.query('update msc_or_mca set ? where University_RollNumber = '+req.params.University_RollNumber,[bt],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
          
               res.send("Details updated");
           }
       
         })
});

module.exports = app3;