const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app10 = express.Router();

app10.use(bodyParser.json());
app10.route('/')
.get((req,res)=>{
    conn.query('select * from no_of_awards_wonbystudents',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Year,bt.Name_Of_Award,bt.TeamORIndividual,bt.InterUniversity_State_National_International,bt.Name_Of_Event,bt.Name_Of_Student,bt.University_RollNumber,bt.E_Copy_Of_Award_Letter];
    conn.query('insert into no_of_awards_wonbystudents values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table no_of_awards_wonbystudents',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app10.route('/:award')
.get((req,res)=>{
    conn.query('select * from no_of_awards_wonbystudents where Name_Of_Award = ?',[req.params.award],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from no_of_awards_wonbystudents where Name_Of_Award= ?',[req.params.award],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.award+' deleted');
          }
       });
})
   
.put((req,res)=>{
    var con = '"'+req.params.award+'"';
    var bt = req.body
    conn.query('update no_of_awards_wonbystudents set ? where Name_Of_Award ='+con,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app10;