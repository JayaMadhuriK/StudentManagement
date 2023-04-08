const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app12 = express.Router();

app12.use(bodyParser.json());
app12.route('/')
.get((req,res)=>{
    conn.query('select * from percentageof_highereducation_students',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.NameOfTeacher,bt.NumberOf_Students_Enrolled,bt.Name_Of_Students,bt.Program_Graduated_From,bt.Name_Of_Institution_joined,bt.Name_Of_Programme_Admitted_To,bt.IdentityCardORAdmissionLetter];
    conn.query('insert into percentageof_highereducation_students values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table percentageof_highereducation_students',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app12.route('/:teacher')
.get((req,res)=>{
    conn.query('select * from percentageof_highereducation_students where NameOfTeacher = ?',[req.params.teacher],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from percentageof_highereducation_students where NameOfTeacher= ?',[req.params.teacher],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.teacher+' deleted');
          }
       });
})
   
.patch((req,res)=>{
    var con ='"' +req.params.teacher+'"';
    var bt = req.body
    conn.query('update percentageof_highereducation_students set ? where NameOfTeacher ='+con,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app12;