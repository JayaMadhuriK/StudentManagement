import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'; 

const AvgNumOfDays = () =>{
    const [dateOfYear,setDateOfYear] = useState(null)
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [dateOfDec,setDateOfDec] = useState(null)
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const [registerRequestBody,setRegisterRequestBody] = useState({
        Program_Name:"",
        Program_Code:"",
        Semester_Year:"",
        LastDateOf_LastSemesterEndExam:"",
        DateOf_Declaration_resultsOf_semester:"",
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const handleSubmit = async() => {
        let res = {};
        await axios.post('http://localhost:4000/avgnumberofdays', registerRequestBody)
        .then((response) => {
            res = response;
        })
        .catch((error) => {
            res = error;
        });
        if(res.data) {
            setToastMessage({...toastMessage, message: "Data Successfully Submitted" ,type:"success"});
            setTimeout(function() {
                window.location.reload(false);
              }, 2000);
        }
        else{
            setToastMessage({...toastMessage, message:"Duplicate Entry...",type:"error"});
        }
    }
    console.log('request body:',registerRequestBody)
    return (
        <Grid>
            <Grid className='activities-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="activities-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                    <FormControl className="register-form">
                            <Grid className="first-grid">
                                <TextField name = "Program_Name" label="Program Name"InputProps={{ sx: { width: 250 } }}onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Program_Code" type="Number" label="Program Code" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Semester Year"
                                        value={dateOfYear}
                                        views={['year']}
                                        name="small"
                                        onChange={(newValue)=>{
                                        setDateOfYear(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        setRegisterRequestBody({...registerRequestBody,Semester_Year:year});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Last Date Of Last Semester End Exam"
                                        value={dateOfBirth}
                                        onChange={(newValue)=>{
                                        setDateOfBirth(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        const month =Number(String(date.getMonth()).padStart(0,2))+1;
                                        const day =String(date.getDate()).padStart(0,2);
                                        const dob = year+"-"+month+"-"+day;
                                        setRegisterRequestBody({...registerRequestBody,LastDateOf_LastSemesterEndExam:dob});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Date Of Declaration results Of semester"
                                        value={dateOfDec}
                                        onChange={(newValue)=>{
                                        setDateOfDec(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        const month =Number(String(date.getMonth()).padStart(0,2))+1;
                                        const day =String(date.getDate()).padStart(0,2);
                                        const dob = year+"-"+month+"-"+day;
                                        setRegisterRequestBody({...registerRequestBody,DateOf_Declaration_resultsOf_semester:dob});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            {/* <Grid className="first-name">
                                <TextField name = "LastDateOf_LastSemesterEndExam" InputProps={{ sx: { width: 250 } }} label="Last Date Of Last Semester End Exam" onChange={(e)=>{onChangeTextField(e)}}  size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "DateOf_Declaration_resultsOf_semester" InputProps={{ sx: { width: 250 } }} label="Date Of Declaration Results Of Semester" onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid> */}
                            <Grid className="button-grid">
                                <Button variant="contained" className="button1" onClick={handleSubmit} color="success">Submit</Button>
                            </Grid>
                    </FormControl>
                </Grid>
                    {toastMessage?.message.length > 0 && 
                        <Alert sx={{ marginTop: '-150px',position:"fixed",marginRight:"300px" , minWidth:'500px'}} severity={toastMessage?.type}>
                            <AlertTitle>{toastMessage?.type}</AlertTitle>
                            <strong>{toastMessage?.message}</strong>
                        </Alert>
                    }
            </Grid>
        </Grid>
    )
}

export default AvgNumOfDays;