import logo from '../logo.jpg'
import Grid from '@material-ui/core/Grid'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'; 
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom'; 
import {useLocation} from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AvgNumOfDays = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [dateOfYear,setDateOfYear] = useState(null)
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [dateOfDec,setDateOfDec] = useState(null)
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const access = localStorage.getItem("user_access");
    const student= location?.state?.student ||({
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
    const editData = location?.state?.student ? true : false;
    const [registerRequestBody,setRegisterRequestBody] = useState(student);
    const handleSubmit = async() => {
        let res = {};
        if(editData){
            await axios.put(`http://localhost:4000/avgnumberofdays/${student.Program_Code}`, registerRequestBody)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewavg")
                }, 2000);
            }
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
                setTimeout(function() {
                    window.location.reload(false);
                }, 2000);
            }
        }else{
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
                setTimeout(function() {
                    window.location.reload(false);
                }, 2000);
            }
        }
    }
    useEffect(()=>{
        if(editData){
            const year = Number(student.Semester_Year);
            setDateOfYear(dayjs(year+"T18:30:00.000Z"));
        }
    },[]);
    useEffect(()=>{
        if(editData){
            setDateOfBirth(dayjs(student.LastDateOf_LastSemesterEndExam));
        }
    },[]);
    useEffect(()=>{
        if(editData){
            setDateOfDec(dayjs(student.DateOf_Declaration_resultsOf_semester));
        }
    },[]);
    return (
        <>
        {access == "ADMIN_ACCESS" ? (
        <Grid>
            <Grid className="stu">
            <Button variant="contained" color="primary" size="large" onClick={()=>{navigate(-1)}} className="buttonnew"><ArrowBackIcon/>BACK</Button>
            </Grid>
            <Grid className='activities-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="activities-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                    <FormControl className="register-form">
                            <Grid className="first-grid">
                                <TextField name = "Program_Name" value={registerRequestBody?.Program_Name} label="Program Name"InputProps={{ sx: { width: 250 } }}onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Program_Code" value={registerRequestBody?.Program_Code} type="Number" label="Program Code" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
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
                                        const dob = month+"-"+day+"-"+year;
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
                                        const dob = month+"-"+day+"-"+year;
                                        setRegisterRequestBody({...registerRequestBody,DateOf_Declaration_resultsOf_semester:dob});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" className="button1" onClick={handleSubmit}>Submit</Button>
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
        </Grid>):(
           <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    )
}

export default AvgNumOfDays;