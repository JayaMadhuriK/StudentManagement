import Home from '../Home/HomeStu'
import {Grid} from '@material-ui/core'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'; 
import {useLocation} from 'react-router-dom'

const MscOrMca = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [dateOfSec,setDateOfSec] = useState(null)
    const [dateOfInter,setDateOfInter] = useState(null)
    const [dateOfBtech,setDateOfBtech] = useState(null)
    const [dateOfMsc,setDateOfMsc] = useState(null)
   
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const student= location?.state?.student ||{
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
        Number_Of_Backlogs:"",
        YOP:""
    };
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
    const editData = location?.state?.student ? true : false;

    const [registerRequestBody,setRegisterRequestBody] = useState(student);
    const handleSubmit = async() => {
        let res = {};
        if(editData){
            await axios.put(`http://localhost:4000/mscormca/${student.University_RollNumber}`, registerRequestBody)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewmscormca")
                }, 2000);
            }
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
            }
        }else{
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
            else if(res.response.status==400){
                setTimeout(function() {
                    setToastMessage({...toastMessage, message:"Duplicate Entries University RollNumber or Email or Adhar Number",type:"error"})
                }, 2000);
            }
            else{
                setTimeout(function() {
                    setToastMessage({...toastMessage, message:"Error, Try Again!",type:"error"});
                }, 2000);
            }
        }
    }
    useEffect(()=>{
        if(editData){
            setDateOfBirth(dayjs(student.DOB));
            const year = Number(student._10th_YOP)-1;
            setDateOfSec(dayjs(year+"-12-31T18:30:00.000Z"));
            const year1 = Number(student._12th_YOP)-1;
            setDateOfInter(dayjs(year1+"-12-31T18:30:00.000Z"));
            const year2 = Number(student.Degree_YOP)-1;
            setDateOfBtech(dayjs(year2+"-12-31T18:30:00.000Z"));
            const year3 = Number(student.YOP)-1;
            setDateOfMsc(dayjs(year3+"-12-31T18:30:00.000Z"));
        }
    },[]);
    return (
        <Grid>
            <Grid><Home/></Grid>
            <Grid className='mtech-popup'>
                <Grid>
                        <FormControl className="mtech-form">
                        <FormLabel className="department-details">Student Form MSC/MCA</FormLabel>
                            <FormLabel className="personal-details">Personal Details</FormLabel>
                                <Grid className = "grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "University_RollNumber" type="Number" label="University Roll Number"  value={registerRequestBody?.University_RollNumber} onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }}></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "First_Name" value={registerRequestBody?.First_Name} label="First Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Last_Name" label="Last Name" value={registerRequestBody?.Last_Name} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
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
                                            const dob = month+"-"+day+"-"+year;
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
                                        value={registerRequestBody?.Gender}
                                        onChange={(e)=>{onChangeRadioGroup(e)}}
                                    >
                                        <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
                                        <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                                        <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
                                    </RadioGroup>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Nationality" value={registerRequestBody?.Nationality} label="Nationality" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Category" label="Category" value={registerRequestBody?.Category} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Sub_Category" label="Sub Category" value={registerRequestBody?.Sub_Category} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "ADHAR_Number" type="Number" label="Aadhar Number" value={registerRequestBody?.ADHAR_Number} onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }}></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="contact-details">Contact Details</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Phone_Number" type="Number" label="Phone Number"  value={registerRequestBody?.Phone_Number} onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }}></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Email_ID" label="Email ID" onChange={(e)=>{onChangeTextField(e)}} value={registerRequestBody?.Email_ID} type="email" size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="address-details">Address</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Address" label="House Number and City" value={registerRequestBody?.Address} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "District" label="District" value={registerRequestBody?.District} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "State" label="State" value={registerRequestBody?.State} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "Country" label="Country" value={registerRequestBody?.Country} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Pin_Code" label="Pin Code" type="Number"  value={registerRequestBody?.Pin_Code} onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 10 }}></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="secondary-details">Seconday Education</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "_10th_CGPA" label="CGPA" onChange={(e)=>{onChangeTextField(e)}} value={registerRequestBody?._10th_CGPA} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "_10th_Board" label="Board" onChange={(e)=>{onChangeTextField(e)}} value={registerRequestBody?._10th_Board} size="small"></TextField>
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
                                        <TextField name = "_12th_Percentage" label="Percentage" value={registerRequestBody?._12th_Percentage} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "_12th_Board" label="Board" onChange={(e)=>{onChangeTextField(e)}} value={registerRequestBody?._12th_Board} size="small"></TextField>
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
                                        <TextField name = "Degree" label="Degree" value={registerRequestBody?.Degree} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Degree_Specialization" value={registerRequestBody?.Degree_Specialization} label="Specialization" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Degree_Score" label="CGPA" value={registerRequestBody?.Degree_Score} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "Degree_University" label="University" value={registerRequestBody?.Degree_University} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Degree_College" label="College" value={registerRequestBody?.Degree_College} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
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
                                        <TextField name = "MSC_OR_MCA" label=" MSC/MCA" value={registerRequestBody?.MSC_OR_MCA} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Course_Branch" label="Branch" value={registerRequestBody?.Course_Branch} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "College" label="College" value={registerRequestBody?.College} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "Entrance_CET" label="CET" value={registerRequestBody?.Entrance_CET} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "CET_Rank" label="Rank" value={registerRequestBody?.CET_Rank} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "MSC_OR_MCA_CGPA" value={registerRequestBody?.MSC_OR_MCA_CGPA} label="CGPA" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Number_Of_Backlogs" value={registerRequestBody?.Number_Of_Backlogs} label="Number Of Backlogs" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
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
                                    <Button style={{ minWidth:'200px'}} variant="contained" onClick={handleSubmit} size="large" color="primary">Submit</Button>
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