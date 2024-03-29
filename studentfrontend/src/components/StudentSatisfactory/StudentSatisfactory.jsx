import logo from '../logo.jpg'
import Grid from '@material-ui/core/Grid'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useLocation} from 'react-router-dom'
import dayjs from 'dayjs';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom'; 
import Home from '../Home/HomeStu';

const StudentSatisfactory = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const student= location?.state?.student || {
        Name_of_Student:"",
        Gender:"",
        Category:"",
        State_of_domicille:"",
        Nationality_if_other_than_india:"",
        Email_ID:"",
        Program_Name:"",
        Student_Unique_Enrollment:"",
        mobile_number:"",
        Year_of_joining:""

    }
    const editData = location?.state?.student ? true : false;
    const [registerRequestBody,setRegisterRequestBody] = useState(student);
    const [dateOfBirth,setDateOfBirth] = useState(null);
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const onChangeRadioGroup = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const handleSubmit = async() => {
        let res={};
        if(editData){
            await axios.put(`http://localhost:4000/studentsatisfactory/${student.Student_Unique_Enrollment}`, registerRequestBody)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            console.log(res)
            if(res?.statusText == "OK") {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewstudent")
                }, 2000);
            }
            else{
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
                // setTimeout(function() {
                //      window.location.reload(false);
                // }, 2000);
            }
        }else{
            await axios.post('http://localhost:4000/studentsatisfactory', registerRequestBody)
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
                // setTimeout(function() {
                //      window.location.reload(false);
                // }, 2000);
            }
        }
    }
    useEffect(()=>{
        if(editData){
            const year = Number(student.Year_of_joining) - 1;
            setDateOfBirth(dayjs(year+"-12-31T18:30:00.000Z"));
        }
    },[]);
    return (
        <Grid>
            <Grid><Home/></Grid>
            <Grid className='student-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="activities-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                    <FormControl className="pass-form">
                            <Grid className="first-grid">
                                <TextField name = "Name_of_Student" label="Name of Student" value={registerRequestBody?.Name_of_Student} InputProps={{ sx: { width: 250 } }}onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Category" label="Category" value={registerRequestBody?.Category} onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "State_of_domicille" label="State" value={registerRequestBody?.State_of_domicille} onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }}size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Nationality_if_other_than_india" value={registerRequestBody?.Nationality_if_other_than_india} label="Nationality(other than India)" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}}  size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Email_ID" type="email" label="Email ID" value={registerRequestBody?.Email_ID} onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }}  size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Program_Name" label="Program Name" value={registerRequestBody?.Program_Name} onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }}  size="smamediumll"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Student_Unique_Enrollment" value={registerRequestBody?.Student_Unique_Enrollment}type="Number" label="University RollNumber" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}}  size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "mobile_number" type="Number" value={registerRequestBody?.mobile_number} label="Mobile Number" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}}  size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Year Of Joining"
                                        value={dateOfBirth}
                                        views={['year']}
                                        onChange={(newValue)=>{
                                        setDateOfBirth(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        setRegisterRequestBody({...registerRequestBody,Year_of_joining:year});
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <FormLabel className="gender-label" ><font color="grey">Gender</font></FormLabel>
                                    <RadioGroup 
                                        className="radio-group"
                                        row
                                        defaultValue="male"
                                        name = "Gender"
                                        value={registerRequestBody?.Gender}
                                        onChange={(e)=>{onChangeRadioGroup(e)}}
                                    >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio/>} label="Other" />
                                </RadioGroup>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" className="button1" onClick={handleSubmit}>Submit</Button>
                            </Grid>
                    </FormControl>
                </Grid>
                {console.log(toastMessage)}
                    {toastMessage?.message.length > 0 && 
                        <Alert sx={{marginTop:"-300px"}} severity={toastMessage?.type}>
                            <AlertTitle>{toastMessage?.type}</AlertTitle>
                            <strong>{toastMessage?.message}</strong>
                        </Alert>
                    }
            </Grid>
        </Grid>
    )
}

export default StudentSatisfactory;