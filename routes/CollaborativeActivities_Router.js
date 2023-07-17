const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app5 = express();
app5.use(bodyParser.json());
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
   
.put(upload.single('image'),(req,res)=>{
    const Title= '"'+req.params.title+'"';
    const {
        Title_of_collaborative_activity,
        Name_of_collaborative_agency_with_contact_details,
        Name_of_Participant,
        Year_of_collaboration,
        Duration,
        Nature_of_Activity,
    } = req.body;
    const Link_to_the_relevant_documents = req.file ? req.file.filename : null;
    const updateData = {
        Title_of_collaborative_activity,
        Name_of_collaborative_agency_with_contact_details,
        Name_of_Participant,
        Year_of_collaboration,
        Duration,
        Nature_of_Activity,
    };
    if (Link_to_the_relevant_documents) {
        updateData.Link_to_the_relevant_documents = Link_to_the_relevant_documents;
    }

    conn.query('update collaborative_activities_withotherinstitutions_pastfiveyrs set ? where Title_of_collaborative_activity ='+Title,[updateData],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

app5.get('/download/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(err);
        res.status(404).send('File not found');
        return;
      }
      res.download(filePath,filename, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal server error');
        }
      });
    });
});
app5.get('/open/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);
  
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(err);
        res.status(404).send('File not found');
        return;
      }
  
      const fileStream = fs.createReadStream(filePath);
      res.setHeader('Content-Type', 'application/pdf');
      fileStream.pipe(res);
    });
});

module.exports = app5;