const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../database');

const app16 = express.Router();

app16.use(bodyParser.json());
app16.route('/login')
.post((req,res)=>{
    var email = req.body.Admin_EmailID;
    var pass = req.body.Admin_Password;
    conn.query('select * from login where Admin_EmailID = ? and Admin_Password = ?',[email,pass],(err,rows)=>{
       
       if(err){
           res.send(err);
       }else{
            if(rows.length > 0){
                const responseObj = {
                    status:200,
                    message:'login successfully',
                    details:{
                        rows
                    }
                }
                res.send(responseObj)
            }
       
            else{
                const responseObj = {
                    status:400,
                    message:'Invalid Email Address or Password',
                }
                res.send(responseObj)
            }
        }

    })
});

app16.post("/register",(req,res)=>{
    var bt = req.body;
    var btData = [bt.Admin_EmailID,bt.Admin_Password,bt.First_Name,bt.Last_Name,bt.Gender,bt.UserType];
    
    conn.query('insert into login values(?)',[btData],(err,rows)=>{
       console.log('response ...............',res);
       if(err){
         const responseObj = {
            status:400,
            message:'Something went wrong',
            details:{
                Admin_EmailID: bt.Admin_EmailID,
                First_Name: bt.First_Name,
                Last_Name: bt.Last_Name,
                Gender: bt.Gender,
                UserType: bt.UserType
            }
        }
        res.status(400).send(responseObj);
        console.log(err);
       }else{
           const responseObj = {
                status:200,
                message:'user registered successfully',
                details:{
                    Admin_EmailID: bt.Admin_EmailID,
                    First_Name: bt.First_Name,
                    Last_Name: bt.Last_Name,
                    Gender: bt.Gender,
                    UserType: bt.UserType
                }
           }
           res.status(200).send(responseObj);
        
       }
      
    })
});

module.exports = app16;