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
    var btData = [bt.Id,bt.Year,bt.Name_of_the_Teacher,bt.NumberOfStudentsGuided,bt.Contact_Details,bt.Program_graduated_from,bt.Name_of_company,bt.Name_of_employer_with_contact_details,bt.Pay_package_at_appointment];
    conn.query('insert into avg_percentage_placement_outgoingstudents_lastfiveyears values(?)',[btData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
           conn.query('select Name_of_the_Teacher, count(*) as count from avg_percentage_placement_outgoingstudents_lastfiveyears group by Name_of_the_Teacher',(err,rows)=>{
            if(err){
                console.log(err);
            }else{
                const resRows = rows;
                resRows?.forEach(element => {
                    let teacher = "'"+element?.Name_of_the_Teacher+"'";
                    conn.query(`update avg_percentage_placement_outgoingstudents_lastfiveyears set NumberOfStudentsGuided=${element?.count} where Name_of_the_Teacher = ${teacher}`,(err,rows)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(rows);
                        }
                    })
                });
            }
           })
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

app4.route('/:Id')
.get((req,res)=>{
    conn.query('select * from avg_percentage_placement_outgoingstudents_lastfiveyears where Id = ?',[req.params.Id],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from avg_percentage_placement_outgoingstudents_lastfiveyears where Id= ?',[req.params.Id],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.Id+' deleted');
          }
       });
})
   
.put((req,res)=>{
    const teachers= '"'+req.params.Id+'"';
    var bt = req.body
    conn.query('update avg_percentage_placement_outgoingstudents_lastfiveyears set ? where Id ='+teachers,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app4;
   