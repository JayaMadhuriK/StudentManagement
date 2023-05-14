const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const multer = require('multer');
const path = require('path');
const app14 = express.Router();
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
})
app14.use(bodyParser.json());
app14.route('/')
.get((req,res)=>{
    conn.query('select * from student_council_activities',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post(upload.single('image'),(req,res)=>{
    // var bt = req.body;
    // var btData = [bt.StudentCouncil_Name,bt.Date_Of_Establishment,bt.Activities,bt.ProofsOREvidencesOrWebLinks];
    const {StudentCouncil_Name} = req.body;
    const {Date_Of_Establishment} = req.body;
    const {Activities} = req.body;
    const ProofsOREvidencesOrWebLinks = req.file.filename;
    conn.query('insert into student_council_activities SET ?',{
        StudentCouncil_Name:StudentCouncil_Name,
        Date_Of_Establishment:Date_Of_Establishment,
        Activities:Activities,
        ProofsOREvidencesOrWebLinks:ProofsOREvidencesOrWebLinks
    },(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table student_council_activities',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app14.route('/:name')
.get((req,res)=>{
    conn.query('select * from student_council_activities where StudentCouncil_Name = ?',[req.params.name],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from student_council_activities where StudentCouncil_Name= ?',[req.params.name],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.name+' deleted');
          }
       });
})
   
.put((req,res)=>{
    var con = '"'+req.params.name+'"';
    var bt = req.body
    conn.query('update student_council_activities set ? where StudentCouncil_Name ='+con,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app14;