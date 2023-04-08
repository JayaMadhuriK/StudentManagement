const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app7 = express.Router();

app7.use(bodyParser.json());
app7.route('/')
.get((req,res)=>{
    conn.query('select * from demand_ratio',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post((req,res)=>{
    var bt = req.body;
    var btData = [bt.Program_Name,bt.Program_Code,bt.No_Of_Seats_Available,bt.No_Of_Eligible_ApplicationReceived,bt.No_Of_Students_Admitted,bt.Demand_Ratio_OR_Year,bt.Avg_Of_Last5Years];
    conn.query('insert into demand_ratio values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table demand_ratio',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app7.route('/:Code')
.get((req,res)=>{
    conn.query('select * from demand_ratio where Program_Code = ?',[req.params.Code],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from demand_ratio where Program_Code= ?',[req.params.Code],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.Code+' deleted');
          }
       });
})
   
.patch((req,res)=>{
  
    var bt = req.body
    conn.query('update demand_ratio set ? where Program_Code ='+req.params.Code,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app7;
   