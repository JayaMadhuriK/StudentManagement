const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app5 = express.Router();

app5.use(bodyParser.json());
app5.route('/')
.get((req,res)=>{
    conn.query('select * from collaborative_activities_withotherinstitutions_pastfiveyrs',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Title_of_collaborative_activity,bt.Name_of_collaborative_agency_with_contact_details,bt.Name_of_Participant,bt.Year_of_collaboration,bt.Duration,bt.NatureofActivity,bt.Link_to_the_relevant_documents];
    conn.query('insert into collaborative_activities_withotherinstitutions_pastfiveyrs values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table collaborative_activities_withotherinstitutions_pastfiveyrs',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app5.route('/:title')
.get((req,res)=>{
    conn.query('select * from collaborative_activities_withotherinstitutions_pastfiveyrs where Title_of_collaborative_activity = ?',[req.params.title],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from collaborative_activities_withotherinstitutions_pastfiveyrs where Title_of_collaborative_activity= ?',[req.params.title],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.title+' deleted');
          }
       });
})
   
.patch((req,res)=>{
    const Title= '"'+req.params.title+'"';
    var bt = req.body
    conn.query('update collaborative_activities_withotherinstitutions_pastfiveyrs set ? where Title_of_collaborative_activity ='+Title,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app5;