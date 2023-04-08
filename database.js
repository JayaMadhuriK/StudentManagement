const mysql = require('mysql');

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Madhu@123',
    database:'studentmanagement'
});
db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connected to database");
    }
});

module.exports = db