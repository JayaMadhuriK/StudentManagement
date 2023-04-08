const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app8 = express.Router();

app8.use(bodyParser.json());
app8.route('/')
.get((req,res)=>{
    conn.query('select * from avg_numofdays_from_date_of_last_semester',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Program_Name,bt.Program_Code,bt.Semester_Year,bt.LastDateOf_LastSemesterEndExam,bt.DateOf_Declaration_resultsOf_semester];
    conn.query('insert into avg_numofdays_from_date_of_last_semester values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table avg_numofdays_from_date_of_last_semester',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app8.route('/:code')
.get((req,res)=>{
    conn.query('select * from avg_numofdays_from_date_of_last_semester where Program_Code = ?',[req.params.code],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from avg_numofdays_from_date_of_last_semester where Program_Code= ?',[req.params.code],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.code+' deleted');
          }
       });
})
   
.patch((req,res)=>{
   
    var bt = req.body
    conn.query('update avg_numofdays_from_date_of_last_semester set ? where Program_Code ='+req.params.code,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app8;
   