const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const app3 = express.Router();
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


app3.use(bodyParser.json());
app3.route('/')
.get((req,res)=>{
    conn.query('select * from msc_or_mca',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post(multiupload,(req,res)=>{
    const {University_RollNumber,First_Name,Last_Name,Gender,Nationality,DOB,Phone_Number,Email_ID,ADHAR_Number,Address,District,State,Country,Pin_Code,Category,Sub_Category,_10th_CGPA,_10th_Board,_10th_YOP,_12th_Percentage,_12th_Board,_12th_YOP,Degree,Degree_Specialization,Degree_Score,Degree_University,Degree_College,Degree_YOP,MSC_OR_MCA,Course_Branch,College,Entrance_CET,CET_Rank,MSC_OR_MCA_CGPA,Number_Of_Backlogs,YOP,StudyingYear,Certificate_Course,Certificate_IssuedBy,CertificatePlatform,Year,
      Name_of_the_Teacher,
      Contact_Details,
      Program_graduated_from,
      Name_of_company,
      Name_of_employer_with_contact_details,
      Pay_Package_at_appointment,
      NameOfTeacher,
      Name_Of_Students,
      Program_Graduated,
      Name_Of_Institution_joined,
      Name_Of_Programme_Admitted_To,Program_name,Program_code,list_of_students_undertaking} = req.body;
    const CertificateUpload = req.files && req.files['CertificateUpload']? req.files['CertificateUpload'][0].filename:null;
    const Upload = req.files && req.files['Upload']? req.files['Upload'][0].filename:null;
    const InternUpload = req.files && req.files['InternUpload']? req.files['InternUpload'][0].filename:null;
    conn.query('insert into msc_or_mca SET ?',{
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
        Degree:Degree,
        Degree_Specialization:Degree_Specialization,
        Degree_Score:Degree_Score,
        Degree_University:Degree_University,
        Degree_College:Degree_College,
        Degree_YOP:Degree_YOP,
        MSC_OR_MCA:MSC_OR_MCA,
        Course_Branch:Course_Branch,
        College:College,
        Entrance_CET:Entrance_CET,
        CET_Rank:CET_Rank,
        MSC_OR_MCA_CGPA:MSC_OR_MCA_CGPA,
        Number_Of_Backlogs:Number_Of_Backlogs,
        YOP:YOP,
        StudyingYear:StudyingYear,
        Certificate_Course:Certificate_Course,
        Certificate_IssuedBy:Certificate_IssuedBy,
        CertificatePlatform:CertificatePlatform,
        CertificateUpload:CertificateUpload,
        Year:Year,
        Name_of_the_Teacher:Name_of_the_Teacher,
        Contact_Details:Contact_Details,
        Program_graduated_from:Program_graduated_from,
        Name_of_company:Name_of_company,
        Name_of_employer_with_contact_details:Name_of_employer_with_contact_details,
        Pay_Package_at_appointment:Pay_Package_at_appointment,
          NameOfTeacher:NameOfTeacher,
          Name_Of_Students:Name_Of_Students,
          Program_Graduated:Program_Graduated,
          Name_Of_Institution_joined:Name_Of_Institution_joined,
          Name_Of_Programme_Admitted_To:Name_Of_Programme_Admitted_To,
          Upload:Upload,
          Program_name:Program_name,
          Program_code:Program_code,
          list_of_students_undertaking:list_of_students_undertaking,
          InternUpload:InternUpload,
    },(err,rows)=>{
       if(err){
           res.sendStatus(400);
           console.log(err);
       }else{
           res.send('inserted');
           conn.query('insert into avg_percentage_placement_outgoingstudents_lastfiveyears SET ?',{
            Year:Year,
            Name_of_the_Teacher:Name_of_the_Teacher,
            Contact_Details:Contact_Details,
            Program_graduated_from:Program_graduated_from,
            Name_of_company:Name_of_company,
            Name_of_employer_with_contact_details:Name_of_employer_with_contact_details,
            Pay_Package_at_appointment:Pay_Package_at_appointment,
        },(err,rows)=>{
            if(err){
                console.log(err);
            }else{
                console.log(rows)
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
        });
        conn.query('insert into percentageof_highereducation_students SET ?',{
            NameOfTeacher:NameOfTeacher,
            Name_Of_Students:Name_Of_Students,
            Program_Graduated_From:Program_Graduated,
            Name_Of_Institution_joined:Name_Of_Institution_joined,
            Name_Of_Programme_Admitted_To:Name_Of_Programme_Admitted_To,
            IdentityCardORAdmissionLetter:Upload
        },(err,rows)=>{
            if(err){
                console.log(err);
            }else{
                console.log(rows)
                conn.query('select NameOfTeacher, count(*) as count from percentageof_highereducation_students group by NameOfTeacher',(err,rows)=>{
                    if(err){
                        console.log(err)
                    }else{
                        const resRows = rows;
                        resRows?.forEach(element => {
                            let teacher = "'"+element?.NameOfTeacher+"'";
                            conn.query(`update percentageof_highereducation_students set NumberOf_Students_Enrolled=${element?.count} where NameOfTeacher = ${teacher}`,(err,rows)=>{
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
        });
        conn.query('insert into percentage_students_undertaking_internships_projects SET ?',{
            Program_name:Program_name,
            Program_code:Program_code,
            list_of_students_undertakig_field_projects_researchs_internships:list_of_students_undertaking,
            link_to_relevant_documents:InternUpload
        },(err,rows)=>{
            if(err){
                console.log(err);
            }else{
                console.log(rows)
            }
        });
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table msc_or_mca',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});
app3.route('/:University_RollNumber')
.get((req,res)=>{
    conn.query('select * from msc_or_mca where University_RollNumber = ?',[req.params.University_RollNumber],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from msc_or_mca where University_RollNumber = ?',[req.params.University_RollNumber],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.University_RollNumber+' deleted');
          }
       });
})
.put(multiupload,(req,res)=>{
  const {University_RollNumber,First_Name,Last_Name,Gender,Nationality,DOB,Phone_Number,Email_ID,ADHAR_Number,Address,District,State,Country,Pin_Code,Category,Sub_Category,_10th_CGPA,_10th_Board,_10th_YOP,_12th_Percentage,_12th_Board,_12th_YOP,Degree,Degree_Specialization,Degree_Score,Degree_University,Degree_College,Degree_YOP,MSC_OR_MCA,Course_Branch,College,Entrance_CET,CET_Rank,MSC_OR_MCA_CGPA,Number_Of_Backlogs,YOP,StudyingYear,Certificate_Course,Certificate_IssuedBy,CertificatePlatform,Year,
    Name_of_the_Teacher,
    Contact_Details,
    Program_graduated_from,
    Name_of_company,
    Name_of_employer_with_contact_details,
    Pay_Package_at_appointment,
    NameOfTeacher,
    Name_Of_Students,
    Program_Graduated,
    Name_Of_Institution_joined,
    Name_Of_Programme_Admitted_To, Program_name,
    Program_code,
    list_of_students_undertaking} = req.body;

    conn.query('update msc_or_mca set ? where University_RollNumber = ?',[{
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
                Degree,
                Degree_Specialization,
                Degree_Score,
                Degree_University,
                Degree_College,
                Degree_YOP,
                MSC_OR_MCA,
                Course_Branch,
                College,
                Entrance_CET,
                CET_Rank,
                MSC_OR_MCA_CGPA,
                Number_Of_Backlogs,
                YOP,
                StudyingYear,
                Certificate_Course,
                Certificate_IssuedBy,
                CertificatePlatform,
                Year,
                Name_of_the_Teacher,
                Contact_Details,
                Program_graduated_from,
                Name_of_company,
                Name_of_employer_with_contact_details,
                Pay_Package_at_appointment,
                NameOfTeacher,
                Name_Of_Students,
                Program_Graduated,
                Name_Of_Institution_joined,
                Name_Of_Programme_Admitted_To, Program_name,
                Program_code,
                list_of_students_undertaking
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
            conn.query('SELECT * FROM msc_or_mca WHERE University_RollNumber = ?', [University_RollNumber], (err, rows) => {
              if (err) {
                console.log(err);
                res.sendStatus(500);
              } else {
                const existingRecord = rows[0];
                const updatedRecord = { ...existingRecord, ...fileUpdates };
  
                conn.query('UPDATE msc_or_mca SET ? WHERE University_RollNumber = ?', [updatedRecord, University_RollNumber], (err, result) => {
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
app3.get('/download/:filename', (req, res) => {
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
app3.get('/open/:filename', (req, res) => {
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

app3.route('/email/:emailid')
.get((req,res)=>{
    conn.query('select * from msc_or_mca where Email_ID = ?',[req.params.emailid],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
});

module.exports = app3;