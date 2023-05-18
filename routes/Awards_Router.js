const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const multer = require('multer');
const path = require('path');
const app10 = express();

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./routes/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({
    storage:storage,
});

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

.post(upload.single('image'),(req,res)=>{
    // var bt = req.body;
    // var btData = [bt.Year,bt.Name_Of_Award,bt.TeamORIndividual,bt.InterUniversity_State_National_International,bt.Name_Of_Event,bt.Name_Of_Student,bt.University_RollNumber,bt.E_Copy_Of_Award_Letter];
    const {Year} = req.body;
    const {Name_Of_Award} = req.body;
    const {TeamORIndividual} = req.body;
    const {InterUniversity_State_National_International} = req.body;
    const {Name_Of_Event} = req.body;
    const {Name_Of_Student} = req.body;
    const {University_RollNumber} = req.body;
    const E_Copy_Of_Award_Letter = req.file.filename;
    conn.query('insert into no_of_awards_wonbystudents SET ?',
    {
        Year:Year,
        Name_Of_Award:Name_Of_Award,
        TeamORIndividual:TeamORIndividual,
        InterUniversity_State_National_International:InterUniversity_State_National_International,
        Name_Of_Event:Name_Of_Event,
        Name_Of_Student:Name_Of_Student,
        University_RollNumber:University_RollNumber,
        E_Copy_Of_Award_Letter:E_Copy_Of_Award_Letter
    }
    ,(err,rows)=>{
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