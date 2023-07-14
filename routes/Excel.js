const xlsx = require('xlsx');
const dbPool =require ('../database');
const express = require('express');
const fs = require('fs');
const excel = express.Router();

const workbookPath='C:\\Users\\madhu\\OneDrive\\Desktop\\Student\\xlsx\\DATA_TEMPLATESNEW.xlsx';
let workbook;
if(fs.existsSync(workbookPath)){
    workbook = xlsx.readFile(workbookPath);
}else{
    workbook = xlsx.utils.book_new();
}
excel.route('/download1')
.post((req,res)=>{
    try{
    let callSP ="call stu_satis()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '2.7.1';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);

            res.send("downloded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download2')
.post(async(req,res)=>{
    try{
        
    let callSP ="call intern()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '1.3.4';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download3')
.post(async(req,res)=>{
    try{
    let callSP ="call lastsem()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '2.5.1';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});



excel.route('/download4')
.post(async(req,res)=>{
    try{
    let callSP ="call passper()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '2.6.3';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download5')
.post(async(req,res)=>{
    try{
    let callSP ="call placement()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '5.2.2';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download6')
.post(async(req,res)=>{
    try{
    let callSP ="call btech()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = 'btech';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            response.forEach((row) => {
                row.CertificateUpload = { f: `HYPERLINK("${row.CertificateUpload}")`, t: 's', v: row.CertificateUpload };
                row.Upload = { f: `HYPERLINK("${row.Upload}")`, t: 's', v: row.Upload };
                row.InternUpload = { f: `HYPERLINK("${row.InternUpload}")`, t: 's', v: row.InternUpload };
              });
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            response.forEach((row) => {
                row.CertificateUpload = { f: `HYPERLINK("${row.CertificateUpload}")`, t: 's', v: row.CertificateUpload };
                row.Upload = { f: `HYPERLINK("${row.Upload}")`, t: 's', v: row.Upload };
                row.InternUpload = { f: `HYPERLINK("${row.InternUpload}")`, t: 's', v: row.InternUpload };
              });
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download7')
.post(async(req,res)=>{
    try{
    let callSP ="call collab()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '3.7.1';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download8')
.post(async(req,res)=>{
    try{
    let callSP ="call demand()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '2.1.1';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});
excel.route('/download9')
.post(async(req,res)=>{
    try{
    let callSP ="call mscmca()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = 'mscmca';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download10')
.post(async(req,res)=>{
    try{
    let callSP ="call mtech()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = 'mtech';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});


excel.route('/download11')
.post(async(req,res)=>{
    try{
    let callSP ="call awards()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '5.3.1';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});


excel.route('/download12')
.post(async(req,res)=>{
    try{
    let callSP ="call higher()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '5.2.3';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});


excel.route('/download13')
.post(async(req,res)=>{
    try{
    let callSP ="call stucomp()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '4.3.3';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download14')
.post(async(req,res)=>{
    try{
    let callSP ="call council()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '5.3.2';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download15')
.post(async(req,res)=>{
    try{
    let callSP ="call yr1()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '1.1.3 & 1.2.1';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download16')
.post(async(req,res)=>{
    try{
    let callSP ="call yr2()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '1.1.3 & 1.2.1';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A50'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A50'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download17')
.post(async(req,res)=>{
    try{
    let callSP ="call yr3()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '1.1.3 & 1.2.1';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A100'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A100'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download18')
.post(async(req,res)=>{
    try{
    let callSP ="call yr4()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '1.1.3 & 1.2.1';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A150'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A150'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});

excel.route('/download19')
.post(async(req,res)=>{
    try{
    let callSP ="call yr5()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '1.1.3 & 1.2.1';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A200'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A200'});
            }
            xlsx.writeFile(workbook,workbookPath);
            res.send("downloaded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});
excel.route('/download20')
.post((req,res)=>{
    try{
    let callSP ="call exam()";
    dbPool.query(callSP,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            let response = result[0];
            let worksheetName = '5.2.1';
            const worksheetIndex = workbook.SheetNames.indexOf(worksheetName);
            if (worksheetIndex !== -1) {
            const worksheet = workbook.Sheets[worksheetName];
            const newWorksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            } else {
            const worksheet = xlsx.utils.json_to_sheet(response);
            xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName);
            xlsx.utils.sheet_add_json(worksheet, response, {skipHeader: true, origin: 'A2'});
            }
            xlsx.writeFile(workbook,workbookPath);

            res.send("downloded");
        }
    })
    }
    catch(e){
        console.log(e);
    }
});


module.exports = excel;

