const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');
const multer = require('multer');
const path = require('path');
const app13 = express();
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
    // var bt = req.body;
    // var btData = [bt.Total_number_of_students,bt.Number_of_computers_available_to_use,bt.Bills_Purchase_documents,bt.Proof_of_stock_register_entry,bt.Student_Computer_Ratio,bt.Name_Of_Department];
    const {Total_number_of_students} = req.body;
    const {Number_of_computers_available_to_use} = req.body;
    const Bills_Purchase_documents = req.file.filename;
    const Proof_of_stock_register_entry = req.file.filename;
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

app13.route('/:numberofstudents')
.get((req,res)=>{
    conn.query('select * from student_computer_ratio where Total_number_of_students = ?',[req.params.numberofstudents],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
           res.send(rows)
       }
    })
})
   
.delete((req,res)=>{
       conn.query('delete from student_computer_ratio where Total_number_of_students= ?',[req.params.numberofstudents],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              res.send('Details of '+req.params.numberofstudents+' deleted');
          }
       });
})
   
.put((req,res)=>{
    
    var bt = req.body
    conn.query('update student_computer_ratio set ? where Total_number_of_students ='+req.params.numberofstudents,[bt],(err,rows)=>{
       if(err){
           console.log(err);
       }else{
       
            res.send("Details updated");
        }
    
      })
});

module.exports = app13;