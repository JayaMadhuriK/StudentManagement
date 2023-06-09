const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const app2 = express.Router();
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

var multiupload = upload.fields([{name:'CertificateUpload',maxCount:5},{name:'Upload',maxCount:5},{name:'InternUpload',maxCount:5}]);


app2.use(bodyParser.json());
app2.route('/')
.get((req,res)=>{
    conn.query('select * from mtech',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post(multiupload,(req,res)=>{
    const {University_RollNumber,First_Name,Last_Name,Gender,Nationality,DOB,Phone_Number,Email_ID,ADHAR_Number,Address,District,State,Country,Pin_Code,Category,Sub_Category,_10th_CGPA,_10th_Board,_10th_YOP,_12th_Percentage,_12th_Board,_12th_YOP,Diploma_Percentage,Diploma_Board,Diploma_YOP,DegreeCourse,Branch,College_Name,Course_CGPA,Entrance_Exam,CET_Rank,Course_YOP,MTECH_College,Department,MTECH_Specialization,MTECH_NumberOF_Backlogs,MTECH_CGPA,YOP,StudyingYear,Certificate_Course,Certificate_IssuedBy,CertificatePlatform,NumberOfCompanies,Company,Package,InternCompany,InternDuration} = req.body;
    const CertificateUpload = req.files && req.files['CertificateUpload']? req.files['CertificateUpload'][0].filename:null;
    const Upload = req.files && req.files['Upload']? req.files['Upload'][0].filename:null;
    const InternUpload = req.files && req.files['InternUpload']? req.files['InternUpload'][0].filename:null;
    conn.query('insert into mtech SET ?',{
        University_RollNumber:University_RollNumber,
        First_Name:First_Name,
        Last_Name:Last_Name,
        Gender:Gender,
        Nationality:Nationality,
        DOB:DOB,
        Phone_Number:Phone_Number,
        Email_ID:Email_ID,
        ADHAR_Number:ADHAR_Number,
        Address:Address,
        District:District,
        State:State,
        Country:Country,
        Pin_Code:Pin_Code,
        Category:Category,
        Sub_Category:Sub_Category,
        _10th_CGPA:_10th_CGPA,
        _10th_Board:_10th_Board,
        _10th_YOP:_10th_YOP,
        _12th_Percentage:_12th_Percentage,
        _12th_Board:_12th_Board,
        _12th_YOP:_12th_YOP,
        Diploma_Percentage:Diploma_Percentage,
        Diploma_Board:Diploma_Board,
        Diploma_YOP:Diploma_YOP,
        DegreeCourse:DegreeCourse,
        Branch:Branch,
        College_Name:College_Name,
        Course_CGPA:Course_CGPA,
        Entrance_Exam:Entrance_Exam,
        CET_Rank:CET_Rank,
        Course_YOP:Course_YOP,
        MTECH_College:MTECH_College,
        Department:Department,
        MTECH_Specialization:MTECH_Specialization,
        MTECH_NumberOF_Backlogs:MTECH_NumberOF_Backlogs,
        MTECH_CGPA:MTECH_CGPA,
        YOP:YOP,
        StudyingYear,
        Certificate_Course:Certificate_Course,
        Certificate_IssuedBy:Certificate_IssuedBy,
        CertificatePlatform:CertificatePlatform,
        CertificateUpload:CertificateUpload,
        NumberOfCompanies:NumberOfCompanies,
        Company:Company,
        Package:Package,
        Upload:Upload,
        InternCompany:InternCompany,
        InternDuration:InternDuration,
        InternUpload:InternUpload,
    },(err,rows)=>{
       if(err){
           res.sendStatus(400);
           console.log(err);
       }else{
           res.send('Inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table mtech',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app2.route('/:University_RollNumber')
.get((req,res)=>{
    conn.query('select * from mtech where University_RollNumber = ?',[req.params.University_RollNumber],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from mtech where University_RollNumber = ?',[req.params.University_RollNumber],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.University_RollNumber+' deleted');
          }
       });
})
 .put(multiupload,(req,res)=>{
    // var bt = req.body
    const {University_RollNumber,First_Name,Last_Name,Gender,Nationality,DOB,Phone_Number,Email_ID,ADHAR_Number,Address,District,State,Country,Pin_Code,Category,Sub_Category,_10th_CGPA,_10th_Board,_10th_YOP,_12th_Percentage,_12th_Board,_12th_YOP,Diploma_Percentage,Diploma_Board,Diploma_YOP,DegreeCourse,Branch,College_Name,Course_CGPA,Entrance_Exam,CET_Rank,Course_YOP,MTECH_College,Department,MTECH_Specialization,MTECH_NumberOF_Backlogs,MTECH_CGPA,YOP,StudyingYear,Certificate_Course,Certificate_IssuedBy,CertificatePlatform,NumberOfCompanies,Company,Package,InternCompany,InternDuration} = req.body;

    conn.query('update mtech set ? where University_RollNumber = ?',[{
       First_Name,
        Last_Name,
        Gender,
        Nationality,
        DOB,
        Phone_Number,
        Email_ID,
        ADHAR_Number,
        Address,
        District,
        State,
        Country,
        Pin_Code,
        Category,
        Sub_Category,
        _10th_CGPA,
        _10th_Board,
        _10th_YOP,
      _12th_Percentage,
      _12th_Board,
      _12th_YOP,
      Diploma_Percentage,
      Diploma_Board,
      Diploma_YOP,
        DegreeCourse,
        Branch,
        College_Name,
        Course_CGPA,
        Entrance_Exam,
        CET_Rank,
        Course_YOP,
        MTECH_College,
        Department,
        MTECH_Specialization,
        MTECH_NumberOF_Backlogs,
        MTECH_CGPA,
        YOP,
        StudyingYear,
        Certificate_Course,
        Certificate_IssuedBy,
        CertificatePlatform,
        NumberOfCompanies,
        Company,
        Package,
        InternCompany,
        InternDuration,
    },University_RollNumber],(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            const filesToUpdate = ['CertificateUpload', 'Upload', 'InternUpload'];
        const fileUpdates = {};

        filesToUpdate.forEach((fieldName) => {
          if (req.files[fieldName]) {
            const file = req.files[fieldName][0];
            fileUpdates[fieldName] = file.filename;
          }
        });
        if (Object.keys(fileUpdates).length > 0) {
            conn.query('SELECT * FROM mtech WHERE University_RollNumber = ?', [University_RollNumber], (err, rows) => {
              if (err) {
                console.log(err);
                res.sendStatus(500);
              } else {
                const existingRecord = rows[0];
                const updatedRecord = { ...existingRecord, ...fileUpdates };
  
                conn.query('UPDATE mtech SET ? WHERE University_RollNumber = ?', [updatedRecord, University_RollNumber], (err, result) => {
                  if (err) {
                    console.log(err);
                    res.sendStatus(500);
                  } else {
                    res.send("Details updated");
                  }
                });
              }
            });
        }else{res.send("Details updated");
    }
            
        }
    
        });
});

app2.get('/download/:filename', (req, res) => {
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
app2.get('/open/:filename', (req, res) => {
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

app2.route('/email/:emailid')
.get((req,res)=>{
    conn.query('select * from mtech where Email_ID = ?',[req.params.emailid],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
});
module.exports = app2;
   