const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app13 = express.Router();

app13.use(bodyParser.json());
app13.route('/')
.get((req,res)=>{
    conn.query('select * from student_computer_ratio',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Total_number_of_students,bt.Number_of_computers_available_to_use,bt.Bills_Purchase_documents,bt.Proof_of_stock_register_entry,bt.Student_Computer_Ratio,bt.Name_Of_Department];
    conn.query('insert into student_computer_ratio values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table student_computer_ratio',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app13.route('/:numberofstudents')
.get((req,res)=>{
    conn.query('select * from student_computer_ratio where Total_number_of_students = ?',[req.params.numberofstudents],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from student_computer_ratio where Total_number_of_students= ?',[req.params.numberofstudents],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.numberofstudents+' deleted');
          }
       });
})
   
.patch((req,res)=>{
    
    var bt = req.body
    conn.query('update student_computer_ratio set ? where Total_number_of_students ='+req.params.numberofstudents,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app13;