const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const multer = require('multer');
const path = require('path');

const app5 = express();
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
.post(upload.single('image'),(req,res)=>{
    const {Title_of_collaborative_activity} = req.body;
    const {Name_of_collaborative_agency_with_contact_details} = req.body;
    const {Name_of_Participant} = req.body;
    const {Year_of_collaboration} = req.body;
    const {Duration} = req.body;
    const {Nature_of_Activity} = req.body;
    const Link_to_the_relevant_documents = req.file.filename;
    conn.query('insert into collaborative_activities_withotherinstitutions_pastfiveyrs SET ?',{
        Title_of_collaborative_activity:Title_of_collaborative_activity,
        Name_of_collaborative_agency_with_contact_details:Name_of_collaborative_agency_with_contact_details,
        Name_of_Participant:Name_of_Participant,
        Year_of_collaboration:Year_of_collaboration,
        Duration:Duration,
        Nature_of_Activity:Nature_of_Activity,
        Link_to_the_relevant_documents:Link_to_the_relevant_documents
    },(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            res.send('inserted');
        }
    });
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
   
.put((req,res)=>{
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