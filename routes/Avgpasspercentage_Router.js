const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app9 = express.Router();

app9.use(bodyParser.json());
app9.route('/')
.get((req,res)=>{
    conn.query('select * from avg_pass_percentage',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Program_Code,bt.Program_Name,bt.NumOfStudents_appeared_in_finalYr_examination,bt.NumOfStudents_Passed_in_finalYr_examination];
    conn.query('insert into avg_pass_percentage values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table avg_pass_percentage',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app9.route('/:code')
.get((req,res)=>{
    conn.query('select * from avg_pass_percentage where Program_Code = ?',[req.params.code],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from avg_pass_percentage where Program_Code= ?',[req.params.code],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.code+' deleted');
          }
       });
})
   
.put((req,res)=>{

    var bt = req.body
    conn.query('update avg_pass_percentage set ? where Program_Code ='+req.params.code,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app9;