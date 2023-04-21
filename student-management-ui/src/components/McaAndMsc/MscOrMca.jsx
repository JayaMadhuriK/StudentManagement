import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const MscOrMca = () =>{
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [dateOfSec,setDateOfSec] = useState(null)
    const [dateOfInter,setDateOfInter] = useState(null)
    const [dateOfBtech,setDateOfBtech] = useState(null)
    const [dateOfMsc,setDateOfMsc] = useState(null)
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const [registerRequestBody,setRegisterRequestBody] = useState({
        University_RollNumber:"",
        First_Name:"",
        Last_Name:"",
        Gender:"male",
        Nationality:"",
        DOB:"",
        Phone_Number:"",
        Email_ID:"",
        ADHAR_Number:"",
        Address:"",
        District:"",
        State:"",
        Country:"",
        Pin_Code:"",
        Category:"",
        Sub_Category:"",
        _10th_CGPA:"",
        _10th_Board:"",
        _10th_YOP:"",
        _12th_Percentage:"",
        _12th_Board:"",
        _12th_YOP:"",
        Degree:"",
        Degree_Specialization:"",
        Degree_Score:"",
        Degree_University:"",
        Degree_College:"",
        Degree_YOP:"",
        MSC_OR_MCA:"",
        Course_Branch:"",
        College:"",
        Entrance_CET:"",
        CET_Rank:"",
        MSC_OR_MCA_CGPA:"",
        Number_Of_Backlogs:""
    });
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
        let res = {};
        await axios.post('http://localhost:4000/mscormca', registerRequestBody)
        .then((response) => {
            res = response;
        })
        .catch((error) => {
            res = error;
        }); 
        console.log(res);
        if(res.data) {
            setToastMessage({...toastMessage, message:"Data Submitted Successfully......",type:"success"});
            setTimeout(function() {
                window.location.reload(false);
            }, 2000);
        }
        else{
            setToastMessage({...toastMessage, message:"Error, Try Again!",type:"error"});
        }
    }
    console.log('request body:',registerRequestBody)
    return (
        <Grid>
            <Grid className='mtech-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="register-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                        <FormControl className="mtech-form">
                        <FormLabel className="department-details">Student Form MSC/MCA</FormLabel>
                            <FormLabel className="personal-details">Personal Details</FormLabel>
                                <Grid className = "grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "University_RollNumber" type="Number" label="University Roll Number" onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }}></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "First_Name" label="First Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Last_Name" label="Last Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                                <DatePicker 
                                                    label="Date Of Birth"
                                                    value={dateOfBirth}
                                                    onChange={(newValue)=>{
                                                    setDateOfBirth(newValue);
                                                    const date = new Date(newValue);
                                                    const year =String(date.getFullYear())
                                                    const month =Number(String(date.getMonth()).padStart(0,2))+1;
                                                    const day =String(date.getDate()).padStart(0,2);
                                                    const dob = year+"-"+month+"-"+day;
                                                    setRegisterRequestBody({...registerRequestBody,DOB:dob});
                                                    }}
                                                    renderInput={(props)=>{ <TextField {...props}/> }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                </Grid>
                                <Grid className="gender-container">
                                    <FormLabel className="gender-label">Gender</FormLabel>
                                    <RadioGroup 
                                        row
                                        defaultValue="male"
                                        name = "Gender"
                                        onChange={(e)=>{onChangeRadioGroup(e)}}
                                    >
                                        <FormControlLabel value="male" control={<Radio color="success"/>} label="Male" />
                                        <FormControlLabel value="female" control={<Radio color="success" />} label="Female" />
                                        <FormControlLabel value="other" control={<Radio color="success" />} label="Other" />
                                    </RadioGroup>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Nationality" label="Nationality" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Category" label="Category" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Sub_Category" label="Sub Category" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "ADHAR_Number" type="Number" label="Aadhar Number" onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }}></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="contact-details">Contact Details</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Phone_Number" type="Number" label="Phone Number" onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }}></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Email_ID" label="Email ID" onChange={(e)=>{onChangeTextField(e)}} type="email" size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="address-details">Address</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Address" label="House Number and City" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "District" label="District" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "State" label="State" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "Country" label="Country" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Pin_Code" label="Pin Code" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 10 }}></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="secondary-details">Seconday Education</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "_10th_CGPA" label="CGPA" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "_10th_Board" label="Board" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                            <DatePicker 
                                                label="Year Of Passing"
                                                value={dateOfInter}
                                                views={['year']}
                                                name="small"
                                                onChange={(newValue)=>{
                                                setDateOfInter(newValue);
                                                const date = new Date(newValue);
                                                const year =String(date.getFullYear())
                                                setRegisterRequestBody({...registerRequestBody,_10th_YOP:year});
                                                }}
                                                renderInput={(props)=>{ <TextField {...props}/> }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                                <FormLabel className="intermediate-details">Intermediate Education</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "_12th_Percentage" label="Percentage" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "_12th_Board" label="Board" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                            <DatePicker 
                                                label="Year Of Passing"
                                                value={dateOfSec}
                                                views={['year']}
                                                name="small"
                                                onChange={(newValue)=>{
                                                setDateOfSec(newValue);
                                                const date = new Date(newValue);
                                                const year =String(date.getFullYear())
                                                setRegisterRequestBody({...registerRequestBody,_12th_YOP:year});
                                                }}
                                                renderInput={(props)=>{ <TextField {...props}/> }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                                <FormLabel className="graduation-details">Graduation</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Degree" label="Degree" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Degree_Specialization" label="Specialization" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Degree_Score" label="CGPA" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "Degree_University" label="University" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Degree_College" label="College" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                            <DatePicker 
                                                label="Year Of Passing"
                                                value={dateOfMsc}
                                                views={['year']}
                                                name="small"
                                                onChange={(newValue)=>{
                                                setDateOfMsc(newValue);
                                                const date = new Date(newValue);
                                                const year =String(date.getFullYear())
                                                setRegisterRequestBody({...registerRequestBody,Degree_YOP:year});
                                                }}
                                                renderInput={(props)=>{ <TextField {...props}/> }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                                <FormLabel className="msc-details">MSC/MCA Details</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "MSC_OR_MCA" label=" MSC/MCA" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Course_Branch" label="Branch" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "College" label="College" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "Entrance_CET" label="CET" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "CET_Rank" label="Rank" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "MSC_OR_MCA_CGPA" label="CGPA" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Number_Of_Backlogs" label="Number Of Backlogs" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                            <DatePicker 
                                                label="Year Of Passing"
                                                value={dateOfBtech}
                                                views={['year']}
                                                name="small"
                                                onChange={(newValue)=>{
                                                setDateOfBtech(newValue);
                                                const date = new Date(newValue);
                                                const year =String(date.getFullYear())
                                                setRegisterRequestBody({...registerRequestBody,YOP:year});
                                                }}
                                                renderInput={(props)=>{ <TextField {...props}/> }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                                <Grid className="submit-button">
                                    <Button style={{ minWidth:'200px'}} variant="contained" onClick={handleSubmit} size="large" color="success">Submit</Button>
                                </Grid>
                        </FormControl>
                </Grid>
                    {toastMessage?.message.length > 0 && 
                        <Alert sx={{marginTop: '-280px',marginLeft:'400px',width:'400px'}} severity={toastMessage?.type}>
                            <AlertTitle>{toastMessage?.type}</AlertTitle>
                            <strong>{toastMessage?.message}</strong>
                        </Alert>
                    }
            </Grid>
        </Grid>
    )
}
export default MscOrMca;