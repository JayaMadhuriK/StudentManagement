const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({
    path:'./.env'
})

var db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connected to database");
    }
});

module.exports = db