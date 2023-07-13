const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app20 = express.Router();

app20.use(bodyParser.json());
app20.route('/')
.get((req,res)=>{
    conn.query('select * from examinations',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.year,bt.Registeration_Number,bt.NET,bt.SLET,bt.GATE,bt.GMAT,bt.CAT,bt.GRE,bt.JAM,bt.IELET,bt.TOEFL,bt.Civil_Services,bt.State_government,bt.Other_examinations];
    conn.query('insert into examinations values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table examinations',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app20.route('/:code')
.get((req,res)=>{
    conn.query('select * from examinations where Registeration_Number = ?',[req.params.code],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from examinations where Registeration_Number= ?',[req.params.code],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.code+' deleted');
          }
       });
})
   
.put((req,res)=>{
   
    var bt = req.body
    conn.query('update examinations set ? where Registeration_Number ='+req.params.code,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app20;
   