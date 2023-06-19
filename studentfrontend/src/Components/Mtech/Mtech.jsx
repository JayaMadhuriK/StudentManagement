import Home from '../Home/HomeStu'
import Grid from '@material-ui/core/Grid'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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

const Mtech = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const [dateOfSec,setDateOfSec] = useState(null)
    const [dateOfInter,setDateOfInter] = useState(null)
    const [dateOfBtech,setDateOfBtech] = useState(null)
    const [dateOfMsc,setDateOfMsc] = useState(null)
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [file,setFile] = useState(location?.state?.student ? null : null);
    const [file1,setFile1] = useState(location?.state?.student ? null : null);
    const [file2,setFile2] = useState(location?.state?.student ? null : null);
    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }
    const handleFile1=(e)=>{
        setFile1(e.target.files[0]);
    }
    const handleFile2=(e)=>{
        setFile2(e.target.files[0]);
    }
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const  student= location?.state?.student ||{
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
        DegreeCourse:"",
        Branch:"",
        College_Name:"",
        Course_CGPA:"",
        Entrance_Exam:"",
        CET_Rank:"",
        Course_YOP:"",
        MTECH_College:"",
        Department:"",
        MTECH_Specialization:"",
        MTECH_NumberOF_Backlogs:"",
        MTECH_CGPA:"",
        YOP:"",
        StudyingYear:"firstyear",
        Certificate_Course:"",
        Certificate_IssuedBy:"",
        CertificatePlatform:"",
        CertificateUpload:"",
        NumberOfCompanies:"",
        Company:"",
        Package:"",
        Upload:"",
        InternCompany:"",
        InternDuration:"",
        InternUpload:"",

    };
    const editData = location?.state?.student ? true : false;

    const [registerRequestBody,setRegisterRequestBody] = useState(student);
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
    const finalValues ={
        Admin_EmailID:registerRequestBody.Email_ID,
        Admin_Password:"Auce@123",
        First_Name:registerRequestBody.First_Name,
        Last_Name:registerRequestBody.Last_Name,
        Gender:registerRequestBody.Gender,
        UserType:"student",
        branch:"mtech"
    };
    const handleSubmit = async() => {
        const formdata = new FormData();
        formdata.append('University_RollNumber',registerRequestBody.University_RollNumber)
        formdata.append('First_Name',registerRequestBody.First_Name)
        formdata.append('Last_Name',registerRequestBody.Last_Name)
        formdata.append('Gender',registerRequestBody.Gender)
        formdata.append('Nationality',registerRequestBody.Nationality)
        formdata.append('DOB',registerRequestBody.DOB)
        formdata.append('Phone_Number',registerRequestBody.Phone_Number)
        formdata.append('Email_ID',registerRequestBody.Email_ID)
        formdata.append('ADHAR_Number',registerRequestBody.ADHAR_Number)
        formdata.append('Address',registerRequestBody.Address)
        formdata.append('District',registerRequestBody.District)
        formdata.append('State',registerRequestBody.State)
        formdata.append('Country',registerRequestBody.Country)
        formdata.append('Pin_Code',registerRequestBody.Pin_Code)
        formdata.append('Category',registerRequestBody.Category)
        formdata.append('Sub_Category',registerRequestBody.Sub_Category)
        formdata.append('_10th_CGPA',registerRequestBody._10th_CGPA)
        formdata.append('_10th_Board',registerRequestBody._10th_Board)
        formdata.append('_10th_YOP',registerRequestBody._10th_YOP)
        formdata.append('_12th_Percentage',registerRequestBody._12th_Percentage)
        formdata.append('_12th_Board',registerRequestBody._12th_Board)
        formdata.append('_12th_YOP',registerRequestBody._12th_YOP)
        formdata.append('Diploma_Percentage',registerRequestBody.Diploma_Percentage)
        formdata.append('Diploma_Board',registerRequestBody.Diploma_Board)
        formdata.append('Diploma_YOP',registerRequestBody.Diploma_YOP)
        formdata.append('DegreeCourse',registerRequestBody.DegreeCourse)
        formdata.append('Branch',registerRequestBody.Branch)
        formdata.append('College_Name',registerRequestBody.College_Name)
        formdata.append('Course_CGPA',registerRequestBody.Course_CGPA)
        formdata.append('Entrance_Exam',registerRequestBody.Entrance_Exam)
        formdata.append('CET_Rank',registerRequestBody.CET_Rank)
        formdata.append('Course_YOP',registerRequestBody.Course_YOP)
        formdata.append('MTECH_College',registerRequestBody.MTECH_College)
        formdata.append('Department',registerRequestBody.Department)
        formdata.append('MTECH_Specialization',registerRequestBody.MTECH_Specialization)
        formdata.append('MTECH_NumberOF_Backlogs',registerRequestBody.MTECH_NumberOF_Backlogs)
        formdata.append('MTECH_CGPA',registerRequestBody.MTECH_CGPA)
        formdata.append('YOP',registerRequestBody.YOP)
        formdata.append('StudyingYear',registerRequestBody.StudyingYear)
        formdata.append('Certificate_Course',registerRequestBody.Certificate_Course)
        formdata.append('Certificate_IssuedBy',registerRequestBody.Certificate_IssuedBy)
        formdata.append('CertificatePlatform',registerRequestBody.CertificatePlatform)
        formdata.append('CertificateUpload',file)
        formdata.append('NumberOfCompanies',registerRequestBody.NumberOfCompanies)
        formdata.append('Company',registerRequestBody.Company)
        formdata.append('Package',registerRequestBody.Package)
        formdata.append('Upload',file1);
        formdata.append('InternCompany',registerRequestBody.InternCompany)
        formdata.append('InternDuration',registerRequestBody.InternDuration)
        formdata.append('InternUpload',file2)
        console.log(formdata)
        let res = {}; 
        if(editData){
            if (file!=null) {
                formdata.append('CertificateUpload', file);
              }
              
              if (file1!=null) {
                formdata.append('Upload', file1);
              }
              
              if (file2!=null) {
                formdata.append('InternUpload', file2);
              }
            await axios.put(`http://localhost:4000/mtech/${student.University_RollNumber}`, formdata)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewmtech")
                }, 2000);
            }
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
            }
        }else{
            await axios.post('http://localhost:4000/mtech', formdata)
            .then((response) => {
                res = response;
            })
            .catch((error) => {
                res = error;
            }); 
            if(res.data) {
                setToastMessage({...toastMessage, message:"Data Submitted Successfully......",type:"success"});
                setTimeout(function() {
                    setToastMessage({...toastMessage, message:""});
                }, 2000);
                await axios.post('http://localhost:4000/register', finalValues)
                .then((response) => {
                    res = response;
                })
                .catch((error) => {
                    res = error;
                });
                if(res.data){
                    setToastMessage({...toastMessage, message:"Account created",type:"success"})
                    setTimeout(function() {
                        setToastMessage({...toastMessage, message:""})
                    }, 2000);
                }else{
                    setToastMessage({...toastMessage, message:"Account not created",type:"error"})
                    setTimeout(function() {
                        setToastMessage({...toastMessage, message:""})
                    }, 2000);
                }
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
                        <FormLabel className="department-details">Student Form MTECH</FormLabel>
                            <FormLabel className="personal-details">Personal Details</FormLabel>
                                <Grid className = "grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "University_RollNumber" type="Number" label="University Roll Number" value={registerRequestBody?.University_RollNumber} onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }} required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "First_Name"  label="First Name" value={registerRequestBody?.First_Name} onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Last_Name" label="Last Name" value={registerRequestBody?.Last_Name} onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                                <DatePicker 
                                                    label="Date Of Birth*"
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
                                        value={registerRequestBody?.Gender}
                                        onChange={(e)=>{onChangeRadioGroup(e)}}
                                    >
                                        <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
                                        <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female" />
                                        <FormControlLabel value="other" control={<Radio color="primary"/>} label="Other" />
                                    </RadioGroup>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Nationality" value={registerRequestBody?.Nationality} label="Nationality" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Category" label="Category" value={registerRequestBody?.Category} onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Sub_Category" label="Sub Category" value={registerRequestBody?.Sub_Category} onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "ADHAR_Number" label="Aadhar Number" type="Number" value={registerRequestBody?.ADHAR_Number} onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }} required></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="contact-details">Contact Details</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Phone_Number" label="Phone Number" type="Number" value={registerRequestBody?.Phone_Number} onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }} required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Email_ID" label="Email ID" onChange={(e)=>{onChangeTextField(e)}} value={registerRequestBody?.Email_ID} type="email" size="small" required></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="address-details">Address</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Address" label="House Number and City" onChange={(e)=>{onChangeTextField(e)}} value={registerRequestBody?.Address} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "District" label="District" value={registerRequestBody?.District} onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "State" value={registerRequestBody?.State} label="State" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "Country" label="Country" value={registerRequestBody?.Country} onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Pin_Code" label="Pin Code" type="Number" value={registerRequestBody?.Pin_Code} onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 10 }} required></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="secondary-details">Seconday Education</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "_10th_CGPA" label="CGPA" value={registerRequestBody?._10th_CGPA} onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "_10th_Board" label="Board" value={registerRequestBody?._10th_Board} onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                            <DatePicker 
                                                label="Year Of Passing*"
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
                                        <TextField name = "_12th_Percentage" label="Percentage" value={registerRequestBody?._12th_Percentage} onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "_12th_Board" label="Board" value={registerRequestBody?._12th_Board} onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                            <DatePicker 
                                                label="Year Of Passing*"
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
                                <FormLabel className="graduation-details">Graduation</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "DegreeCourse" value={registerRequestBody?.DegreeCourse} label="Course" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Branch" value={registerRequestBody?.Branch} label="Branch" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "College_Name" value={registerRequestBody?.College_Name} label="College Name" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "Course_CGPA" value={registerRequestBody?.Course_CGPA} label="CGPA" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Entrance_Exam" value={registerRequestBody?.Entrance_Exam} label="Entrance CET" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "CET_Rank" value={registerRequestBody?.CET_Rank} label="Rank" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                            <DatePicker 
                                                label="Year Of Passing*"
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
                                <FormLabel className="mtech-details">MTECH Details</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "MTECH_College" value={registerRequestBody?.MTECH_College} label="College Name" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Department" value={registerRequestBody?.Department} label="Department" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "MTECH_Specialization" value={registerRequestBody?.MTECH_Specialization} label="Specialization" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "MTECH_NumberOF_Backlogs" value={registerRequestBody?.MTECH_NumberOF_Backlogs} label="Number Of Backlogs" onChange={(e)=>{onChangeTextField(e)}} type="Number" size="small" required></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "MTECH_CGPA" value={registerRequestBody?.MTECH_CGPA} label="CGPA" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                            <DatePicker 
                                                label="Year Of Passing*"
                                                value={dateOfMsc}
                                                views={['year']}
                                                name="small"
                                                onChange={(newValue)=>{
                                                setDateOfMsc(newValue);
                                                const date = new Date(newValue);
                                                const year =String(date.getFullYear())
                                                setRegisterRequestBody({...registerRequestBody,YOP:year});
                                                }}
                                                renderInput={(props)=>{ <TextField {...props}/> }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                                <Grid className="gender-container">
                                <FormLabel className="gender-label">Studying Year</FormLabel>
                                <RadioGroup 
                                    row
                                    defaultValue="firstyear"
                                    name = "StudyingYear"
                                    value={registerRequestBody?.StudyingYear}
                                    onChange={(e)=>{onChangeRadioGroup(e)}}
                                >
                                    <FormControlLabel value="firstyear" control={<Radio color="primary"/>} label="First Year" />
                                    <FormControlLabel value="secondyear" control={<Radio color="primary" />} label="Second Year" />
                                </RadioGroup>
                            </Grid>
                                <FormLabel className="certificates">Certificates</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Certificate_Course" value={registerRequestBody?.Certificate_Course} label="Certificate Course" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Certificate_IssuedBy" value={registerRequestBody?.Certificate_IssuedBy} label="Issued By" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "CertificatePlatform" value={registerRequestBody?.CertificatePlatform} label="Certificate Platform" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "CertificateUpload" type='file' onChange={handleFile} InputProps={{ sx: { width: 250 } }} inputProps={{multiple:true}} size="small" ></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="internships">Internships</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "InternCompany" value={registerRequestBody?.InternCompany} label="Company Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "InternDuration" value={registerRequestBody?.InternDuration} label="Duration" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "InternUpload" type='file' onChange={handleFile1} InputProps={{ sx: { width: 250 } }} inputProps={{multiple:true}} size="small" ></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="placements">Placement Details</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "NumberOfCompanies" type="Number" value={registerRequestBody?.NumberOfCompanies} label="Number of companies selected" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Company" value={registerRequestBody?.Company} label="Company Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Package" value={registerRequestBody?.Package} label="Pay Package" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "Upload" type='file' onChange={handleFile2} InputProps={{ sx: { width: 250 } }} inputProps={{multiple:true}} size="small" ></TextField>
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
export default Mtech;