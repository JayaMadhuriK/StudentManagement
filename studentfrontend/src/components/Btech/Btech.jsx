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

const Btech = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [dateOfSec,setDateOfSec] = useState(null)
    const [dateOfInter,setDateOfInter] = useState(null)
    const [dateOfBtech,setDateOfBtech] = useState(null)
    const [place,setPlace] = useState(null)
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
        StudyingYear:"firstyear",
        Certificate_Course:"",
        Certificate_IssuedBy:"",
        CertificateUpload:"",
        CertificatePlatform:"",
        Program_name:"",
      Program_code:"",
      list_of_students_undertaking:"",
        InternUpload:"",
        Year:"",
        Name_of_the_Teacher:"",
        Contact_Details:"",
        Program_graduated_from:"",
        Name_of_company:"",
        Name_of_employer_with_contact_details:"",
        Pay_Package_at_appointment:"",
        NameOfTeacher:"",
        Name_Of_Students:"",
        Program_Graduated:"",
        Name_Of_Institution_joined:"",
        Name_Of_Programme_Admitted_To:"",
        Upload:"",
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
    const finalValues ={
        Admin_EmailID:registerRequestBody.Email_ID,
        Admin_Password:"Auce@123",
        First_Name:registerRequestBody.First_Name,
        Last_Name:registerRequestBody.Last_Name,
        Gender:registerRequestBody.Gender,
        UserType:"student",
        branch:"btech"
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
        formdata.append('Course_RegularORIntegrated',registerRequestBody.Course_RegularORIntegrated)
        formdata.append('Branch',registerRequestBody.Branch)
        formdata.append('College_Name',registerRequestBody.College_Name)
        formdata.append('Course_CGPA',registerRequestBody.Course_CGPA)
        formdata.append('Number_Of_Backlogs',registerRequestBody.Number_Of_Backlogs)
        formdata.append('Entrance_Exam',registerRequestBody.Entrance_Exam)
        formdata.append('CET_Rank',registerRequestBody.CET_Rank)
        formdata.append('Course_YOP',registerRequestBody.Course_YOP)
        formdata.append('StudyingYear',registerRequestBody.StudyingYear)
        formdata.append('Certificate_Course',registerRequestBody.Certificate_Course)
        formdata.append('Certificate_IssuedBy',registerRequestBody.Certificate_IssuedBy)
        formdata.append('CertificatePlatform',registerRequestBody.CertificatePlatform)
        formdata.append('CertificateUpload',file)
        formdata.append('Program_name',registerRequestBody.Program_name)
        formdata.append('Program_code',registerRequestBody.Program_code)
        formdata.append('list_of_students_undertaking',registerRequestBody.list_of_students_undertaking)
        formdata.append('InternUpload',file1)
        formdata.append('Year',registerRequestBody.Year)
        formdata.append('Name_of_the_Teacher',registerRequestBody.Name_of_the_Teacher)
        formdata.append('Contact_Details',registerRequestBody.Contact_Details)
        formdata.append('Program_graduated_from',registerRequestBody.Program_graduated_from)
        formdata.append('Name_of_company',registerRequestBody.Name_of_company)
        formdata.append('Name_of_employer_with_contact_details',registerRequestBody.Name_of_employer_with_contact_details)
        formdata.append('Pay_Package_at_appointment',registerRequestBody.Pay_Package_at_appointment)
        formdata.append('NameOfTeacher',registerRequestBody.NameOfTeacher)
        formdata.append('Name_Of_Students',registerRequestBody.Name_Of_Students)
        formdata.append('Program_Graduated',registerRequestBody.Program_Graduated)
        formdata.append('Name_Of_Institution_joined',registerRequestBody.Name_Of_Institution_joined)
        formdata.append('Name_Of_Programme_Admitted_To',registerRequestBody.Name_Of_Programme_Admitted_To)
        formdata.append('Upload',file2)
        let res = {};
        if(editData){
            if (file!=null) {
                formdata.append('CertificateUpload', file);
              }
              
              if (file1!=null) {
                formdata.append('InternUpload', file1);
              }
              if (file2!=null) {
                formdata.append('Upload', file2);
              }
            
            await axios.put(`http://localhost:4000/btech/${student.University_RollNumber}`, formdata)
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
            await axios.post('http://localhost:4000/btech', formdata)
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
                // setTimeout(function() {
                //      window.location.reload(false);
                // }, 2000);
            }
            else if(res.response.status==400){
                setTimeout(function() {
                    setToastMessage({...toastMessage, message:"Duplicate Entries University RollNumber or Email or Adhar Number",type:"error"})
                }, 3000);
            }
            else{
                setToastMessage({...toastMessage, message:"Error, Try Again!",type:"error"});
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
            const year3 = Number(student.Year)-1;
            setPlace(dayjs(year3+"-12-31T18:30:00.000Z"));
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
                                    <TextField name = "University_RollNumber" type="Number" label="University Roll Number"  value={registerRequestBody?.University_RollNumber} inputProps={{ maxLength: 12 }} onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "First_Name" value={registerRequestBody?.First_Name} label="First Name" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "Last_Name" value={registerRequestBody?.Last_Name} label="Last Name" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
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
                                    <TextField name = "Nationality" value={registerRequestBody?.Nationality} label="Nationality" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "Category" value={registerRequestBody?.Category} label="Category" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "Sub_Category" value={registerRequestBody?.Sub_Category} label="Sub Category" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField name = "ADHAR_Number" value={registerRequestBody?.ADHAR_Number} label="Aadhar Number" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }} ></TextField>
                                </Grid>
                            </Grid>
                            <FormLabel className="contact-details">Contact Details</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "Phone_Number" value={registerRequestBody?.Phone_Number} label="Phone Number" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 12 }} ></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "Email_ID" value={registerRequestBody?.Email_ID} label="Email ID" onChange={(e)=>{onChangeTextField(e)}} type="email" size="small" ></TextField>
                                </Grid>
                            </Grid>
                            <FormLabel className="address-details">Address</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "Address" value={registerRequestBody?.Address} label="House Number and City" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "District" value={registerRequestBody?.District} label="District" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "State" value={registerRequestBody?.State} label="State" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField name = "Country" value={registerRequestBody?.Country} label="Country" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                            </Grid>
                                <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "Pin_Code" value={registerRequestBody?.Pin_Code} label="Pin Code" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small" inputProps={{ maxLength: 10 }} ></TextField>
                                </Grid>
                            </Grid>
                            <FormLabel className="secondary-details">Seconday Education</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "_10th_CGPA" value={registerRequestBody?._10th_CGPA} label="CGPA" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "_10th_Board" value={registerRequestBody?._10th_Board} label="Board" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
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
                                    <TextField name = "_12th_Percentage" value={registerRequestBody?._12th_Percentage} label="Percentage" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "_12th_Board" value={registerRequestBody?._12th_Board} label="Board" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
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
                                    <TextField name = "Course_RegularORIntegrated" value={registerRequestBody?.Course_RegularORIntegrated} label="Regular/Integrated" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "Branch" value={registerRequestBody?.Branch} label="Branch" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "College_Name" value={registerRequestBody?.College_Name} label="College Name" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField name = "Course_CGPA" value={registerRequestBody?.Course_CGPA} label="CGPA" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                            </Grid>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField name = "Number_Of_Backlogs" value={registerRequestBody?.Number_Of_Backlogs} label="Number Of Backlogs" onChange={(e)=>{onChangeTextField(e)}} size="small" type="Number" ></TextField>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "Entrance_Exam" value={registerRequestBody?.Entrance_Exam} label="Entrance CET" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "CET_Rank" value={registerRequestBody?.CET_Rank} label="Rank" type="Number" onChange={(e)=>{onChangeTextField(e)}} size="small" ></TextField>
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
                                    <FormControlLabel value="thirdyear" control={<Radio color="primary" />} label="Third Year" />
                                    <FormControlLabel value="fourthyear" control={<Radio color="primary" />} label="Fourth Year" />
                                    <FormControlLabel value="fifthyear" control={<Radio color="primary" />} label="Fifth Year" />
                                    <FormControlLabel value="sixthyear" control={<Radio color="primary" />} label="Sixth Year" />
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
                                        <TextField name = "CertificateUpload" type='file' onChange={handleFile} InputProps={{ sx: { width: 250 } }} size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="internships">Internships</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Program_name" value={registerRequestBody?.Program_name} label="Program_name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Program_code" value={registerRequestBody?.Program_code} label="Program_code" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "list_of_students_undertaking" value={registerRequestBody?.list_of_students_undertaking} label="list_of_students_undertaking" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "InternUpload" type='file' onChange={handleFile1} InputProps={{ sx: { width: 250 } }} size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="internships">Placements</FormLabel>
                               <Grid className="grid-container">
                               <Grid className="first-grid-item">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                        <DatePicker 
                                            label="Year"
                                            value={place}
                                            views={['year']}
                                            name="small"
                                            onChange={(newValue)=>{
                                            setPlace(newValue);
                                            const date = new Date(newValue);
                                            const year =String(date.getFullYear())
                                            setRegisterRequestBody({...registerRequestBody,Year:year});
                                            }}
                                            renderInput={(props)=>{ <TextField {...props}/> }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField name = "Name_of_the_Teacher" value={registerRequestBody?.Name_of_the_Teacher} label="Name_of_the_Teacher" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField name = "Contact_Details" value={registerRequestBody?.Contact_Details} label="Contact_Details" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField name = "Program_graduated_from" value={registerRequestBody?.Program_graduated_from} label="Program_graduated_from" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                </Grid>
                            </Grid>
                            <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Name_of_company" value={registerRequestBody?.Name_of_company} label="Name_of_company" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Name_of_employer_with_contact_details" value={registerRequestBody?.Name_of_employer_with_contact_details} label="Name_of_employer_with_contact_details" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Pay_Package_at_appointment" value={registerRequestBody?.Pay_Package_at_appointment} label="Pay_Package_at_appointment" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <FormLabel className="higher">Higher Education</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "NameOfTeacher" value={registerRequestBody?.NameOfTeacher} label="NameOfTeacher" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Name_Of_Students" value={registerRequestBody?.Name_Of_Students} label="Name_Of_Students" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "Program_Graduated" value={registerRequestBody?.Program_Graduated} label="Program_Graduated" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "Name_Of_Institution_joined" value={registerRequestBody?.Name_Of_Institution_joined} label="Name_Of_Institution_joined" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "Name_Of_Programme_Admitted_To" value={registerRequestBody?.Name_Of_Programme_Admitted_To} label="Name_Of_Programme_Admitted_To" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Upload" type='file' onChange={handleFile2} InputProps={{ sx: { width: 250 } }} size="small"></TextField>
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