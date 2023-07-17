const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app13 = express();
app13.set('view engine','ejs')
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

var multiupload = upload.fields([{name:'image'},{name:'image1',maxCount:1}]);

app13.use(bodyParser.json());
app13.route('/')
.get((req,res)=>{
    conn.query('select * from student_computer_ratio',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})

.post(multiupload,(req,res)=>{
    const {Total_number_of_students} = req.body;
    const {Number_of_computers_available_to_use} = req.body;
    const Bills_Purchase_documents = req.files && req.files['Bills_Purchase_documents']? req.files['Bills_Purchase_documents'][0].filename:null;
    const Proof_of_stock_register_entry = req.files && req.files['Proof_of_stock_register_entry']? req.files['Proof_of_stock_register_entry'][0].filename:null;
    const {Student_Computer_Ratio} = req.body;
    const {Name_Of_Department} = req.body;
    conn.query('insert into student_computer_ratio SET ?',{
        Total_number_of_students:Total_number_of_students,
        Number_of_computers_available_to_use:Number_of_computers_available_to_use,
        Bills_Purchase_documents:Bills_Purchase_documents,
        Proof_of_stock_register_entry:Proof_of_stock_register_entry,
        Student_Computer_Ratio:Student_Computer_Ratio,
        Name_Of_Department:Name_Of_Department
    },(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('inserted');
       }
       
    })
})
.delete((req,res)=>{
    conn.query('truncate table student_computer_ratio',(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send('All rows deleted');
       }
    });
});

app13.route('/:Id')
.get((req,res)=>{
    conn.query('select * from student_computer_ratio where Id = ?',[req.params.Id],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from student_computer_ratio where Id= ?',[req.params.Id],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.Id+' deleted');
          }
       });
})
   
.put(multiupload,(req,res)=>{
    const {Id} = req.body;
    const {Total_number_of_students} = req.body;
    const {Number_of_computers_available_to_use} = req.body;
    const {Student_Computer_Ratio} = req.body;
    const {Bills_Purchase_documents} = req.body;
    const {Proof_of_stock_register_entry} = req.body;
    const {Name_Of_Department} = req.body;
    conn.query('update student_computer_ratio set ? where Id ='+req.params.Id,[{
        Id,
        Total_number_of_students,
        Number_of_computers_available_to_use,
        Bills_Purchase_documents,
        Proof_of_stock_register_entry,
        Student_Computer_Ratio,
        Name_Of_Department
    }],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
        const filesToUpdate = ['Bills_Purchase_documents', 'Proof_of_stock_register_entry'];
            const fileUpdates = {};

        filesToUpdate.forEach((fieldName) => {
          if (req.files[fieldName]) {
            const file = req.files[fieldName][0];
            fileUpdates[fieldName] = file.filename;
          }
        });
        if (Object.keys(fileUpdates).length > 0 || Object.keys(fileUpdates) == null) {
            conn.query('SELECT * FROM student_computer_ratio WHERE Id = ?', [Id], (err, rows) => {
              if (err) {
                console.log(err);
                res.sendStatus(500);
              } else {
                const existingRecord = rows[0];
                const updatedRecord = { ...existingRecord, ...fileUpdates };
  
                conn.query('UPDATE student_computer_ratio SET ? WHERE Id = ?', [updatedRecord, Id], (err, result) => {
                  if (err) {
                    console.log(err);
                    res.sendStatus(500);
                  } else {
                    console.log('updated')
                  }
                });
            }
        });
    }
        }
    
      })
});
app13.get('/download/:filename', (req, res) => {
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
app13.get('/open/:filename', (req, res) => {
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

module.exports = app13;