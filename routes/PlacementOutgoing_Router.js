const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app4 = express.Router();

app4.use(bodyParser.json());
app4.route('/')
.get((req,res)=>{
    conn.query('select * from avg_percentage_placement_outgoingstudents_lastfiveyears',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Year,bt.Name_of_the_Teacher,bt.NumberOfStudentsGuided,bt.Contact_Details,bt.Program_graduated_from,bt.Name_of_company,bt.Name_of_employer_with_contact_details,bt.Pay_package_at_appointment];
    conn.query('insert into avg_percentage_placement_outgoingstudents_lastfiveyears values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table avg_percentage_placement_outgoingstudents_lastfiveyears',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app4.route('/:teacher')
.get((req,res)=>{
    conn.query('select * from avg_percentage_placement_outgoingstudents_lastfiveyears where Name_of_the_Teacher = ?',[req.params.teacher],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from avg_percentage_placement_outgoingstudents_lastfiveyears where Name_of_the_Teacher= ?',[req.params.teacher],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.teacher+' deleted');
          }
       });
})
   
.patch((req,res)=>{
    const teachers= '"'+req.params.teacher+'"';
    var bt = req.body
    conn.query('update avg_percentage_placement_outgoingstudents_lastfiveyears set ? where Name_of_the_Teacher ='+teachers,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app4;
   