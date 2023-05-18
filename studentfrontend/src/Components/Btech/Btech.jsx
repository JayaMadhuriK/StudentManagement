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

const Btech = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [dateOfSec,setDateOfSec] = useState(null)
    const [dateOfInter,setDateOfInter] = useState(null)
    const [dateOfBtech,setDateOfBtech] = useState(null)
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
        Diploma_Percentage:"",
        Diploma_Board:"",
        Diploma_YOP:"",
        Course_RegularORIntegrated:"",
        Branch:"",
        College_Name:"",
        Course_CGPA:"",
        Number_Of_Backlogs:"",
        Entrance_Exam:"",
        CET_Rank:"",
        Course_YOP:"",

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
            await axios.put(`http://localhost:4000/btech/${student.University_RollNumber}`, registerRequestBody)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewbtech")
                }, 2000);
            }
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
            }
        }else{
            await axios.post('http://localhost:4000/btech', registerRequestBody)
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
                }, 3000);
            }
            else{
                setToastMessage({...toastMessage, message:"Data Submitted Successfully......",type:"success"});
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
            const year2 = Number(student.Course_YOP)-1;
            setDateOfBtech(dayjs(year2+"-12-31T18:30:00.000Z"));
        }
    },[]);
    return (
        <Grid>
            <Grid><Home/></Grid>
            <Grid className='mtech-popup'>
                <Grid>
                    <FormControl className="mtech-form">
                        <FormLabel className="department-details">Student Form BTECH</FormLabel>
                        <FormLabel className="personal-details">Personal Details</FormLabel>
                            <Grid className = "grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "University_RollNumber" type="Number" label="University Roll Number"  value={registerRequestBody?.University_RollNumber} inputProps={{ maxLength: 12 }} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "First_Name" value={registerRequestBody?.First_Name} label="First Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "Last_Name" value={registerRequestBody?.Last_Name} label="Last Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
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
                                    <TextField name = "Category" value={registerRequestBody?.Category} label="Category" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "Sub_Category" value={registerRequestBody?.Sub_Category} label="Sub Category" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField name = "ADHAR_Number" value={registerRequestBody?.ADHAR_Number} label="Aadhar Number" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }}></TextField>
                                </Grid>
                            </Grid>
                            <FormLabel className="contact-details">Contact Details</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "Phone_Number" value={registerRequestBody?.Phone_Number} label="Phone Number" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }}></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "Email_ID" value={registerRequestBody?.Email_ID} label="Email ID" onChange={(e)=>{onChangeTextField(e)}} type="email" size="small"></TextField>
                                </Grid>
                            </Grid>
                            <FormLabel className="address-details">Address</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "Address" value={registerRequestBody?.Address} label="House Number and City" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "District" value={registerRequestBody?.District} label="District" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "State" value={registerRequestBody?.State} label="State" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField name = "Country" value={registerRequestBody?.Country} label="Country" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                            </Grid>
                                <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "Pin_Code" value={registerRequestBody?.Pin_Code} label="Pin Code" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 10 }}></TextField>
                                </Grid>
                            </Grid>
                            <FormLabel className="secondary-details">Seconday Education</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "_10th_CGPA" value={registerRequestBody?._10th_CGPA} label="CGPA" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "_10th_Board" value={registerRequestBody?._10th_Board} label="Board" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
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
                                    <TextField name = "_12th_Percentage" value={registerRequestBody?._12th_Percentage} label="Percentage" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "_12th_Board" value={registerRequestBody?._12th_Board} label="Board" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
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
                                            setRegisterRequestBody({...registerRequestBody,_12th_YOP:year});
                                            }}
                                            renderInput={(props)=>{ <TextField {...props}/> }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <FormLabel className="diploma-details">Diploma Education(Optional)</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "Diploma_Percentage" value={registerRequestBody?.Diploma_Percentage} label="Percentage" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "Diploma_Board" value={registerRequestBody?.Diploma_Board} label="Board" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "Diploma_YOP" value={registerRequestBody?.Diploma_YOP} label="Year Of Passing" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                            </Grid>
                            <FormLabel className="mtech-details">BTECH Details</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "Course_RegularORIntegrated" value={registerRequestBody?.Course_RegularORIntegrated} label="Regular/Integrated" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "Branch" value={registerRequestBody?.Branch} label="Branch" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "College_Name" value={registerRequestBody?.College_Name} label="College Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField name = "Course_CGPA" value={registerRequestBody?.Course_CGPA} label="CGPA" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                            </Grid>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "Number_Of_Backlogs" value={registerRequestBody?.Number_Of_Backlogs} label="Number Of Backlogs" onChange={(e)=>{onChangeTextField(e)}} size="small" type="Number"></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "Entrance_Exam" value={registerRequestBody?.Entrance_Exam} label="Entrance CET" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "CET_Rank" value={registerRequestBody?.CET_Rank} label="Rank" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
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
                                            setRegisterRequestBody({...registerRequestBody,Course_YOP:year});
                                            }}
                                            renderInput={(props)=>{ <TextField {...props}/> }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <Grid className="submit-button">
                                <Button variant="contained" style={{ minWidth:'200px'}} onClick={handleSubmit} color="primary">Submit</Button>
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

export default Btech;