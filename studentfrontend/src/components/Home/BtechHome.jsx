import Grid from '@material-ui/core/Grid'
import React,{useEffect, useState} from 'react'
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useLocation,useNavigate} from 'react-router-dom' 
import { FileOpen } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
const BtechHome = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [isLogOutDialogOpen,setIsLogOutDialogOpen] = useState(false);
    const handleLogOut = () => {
        localStorage.setItem("user_access","");
        navigate("/")
    };
    const handleLogOutClose = () =>{
        setIsLogOutDialogOpen(false);
    };
    const userDetails = location?.state?.studentDetails;
    const [user,setUser] = useState({
        University_RollNumber:"",
        First_Name:"",
        Last_Name:"",
        Gender:"",
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
        StudyingYear:"",
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
        yearforexamination:"",
        Registeration_Number:"",
        NET:"",
        SLET:"",
        GATE:"",
        GMAT:"",
        CAT:"",
        GRE:"",
        JAM:"",
        IELET:"",
        TOEFL:"",
        Civil_Services:"",
        State_government:"",
        Other_examinations:"",
        PlaceFile:"",
        ExamFile:""
    });
    const [editing, setEditing] = useState(false);
    const [file,setFile] = useState(null);
    const [file1,setFile1] = useState(null);
    const [file2,setFile2] = useState(null);
    const [file3,setFile3] = useState(null);
    const [file4,setFile4] = useState(null);
    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }
    const handleFile1=(e)=>{
        setFile1(e.target.files[0]);
    }
    const handleFile2=(e)=>{
        setFile2(e.target.files[0]);
    }
    const handleFile3=(e)=>{
        setFile3(e.target.files[0]);
    }
    const handleFile4=(e)=>{
        setFile4(e.target.files[0]);
    }
    const [systemErrors,setSystemErrors] = useState("");
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert ref={ref} variant="filled" {...props} />;
    });
    
    const fetchUser = async() =>{
        try{
            const response =await axios.get(`http://localhost:4000/btech/email/${userDetails.Admin_EmailID}`);
            setUser(response?.data);
            console.log(response)
        }catch(error){
            console.log(error);
        }
    };
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user,[name]:value})
    }
    const onChangeCheckboxGroup = (e) => {
        const {name,value,checked} = e.target;
        setUser({...user,[name]:checked ? user.First_Name+user.Last_Name : ""})
    }
    const onChangeRadioGroup = (e) => {
        setUser({...user,Gender:e.target.value})
        setUser({...user,StudyingYear:e.target.value})
    }
    const updateInternship = () =>{
        const formdata = new FormData();
        formdata.append('Id',user.University_RollNumber)
        formdata.append('Program_name',user.Program_name)
        formdata.append('Program_code',user.Program_code)
        formdata.append('list_of_students_undertakig_field_projects_researchs_internships',user.First_Name+user.Last_Name)
        formdata.append('image',file1);
        axios.put(`http://localhost:4000/internships/${user.University_RollNumber}`, formdata)
            .then((response) => {
            const res = response;
            })
            .catch((error) => {
            const res = error;
            });
    }
    const updateExam = () =>{
        const formdata = new FormData();
        formdata.append('year',user.yearforexamination)
        formdata.append('Registeration_Number',user.University_RollNumber)
        formdata.append('NET',user.NET)
        formdata.append('SLET',user.SLET)
        formdata.append('GATE',user.GATE)
        formdata.append('GMAT',user.GMAT)
        formdata.append('CAT',user.CAT)
        formdata.append('GRE',user.GRE)
        formdata.append('JAM',user.JAM)
        formdata.append('IELET',user.IELET)
        formdata.append('TOEFL',user.TOEFL)
        formdata.append('Civil_Services',user.Civil_Services)
        formdata.append('State_government',user.State_government)
        formdata.append('Other_examinations',user.Other_examinations)
        formdata.append('image',file4)
        axios.put(`http://localhost:4000/exam/${user.University_RollNumber}`, formdata)
            .then((response) => {
            const res = response;
            })
            .catch((error) => {
            const res = error;
            });
    }
    const updateHigher = () =>{
        const formdata = new FormData();
        formdata.append('Id',user.University_RollNumber)
        formdata.append('NameOfTeacher',user.NameOfTeacher)
        formdata.append('NumberOf_Students_Enrolled',user.NumberOf_Students_Enrolled)
        formdata.append('Name_Of_Students',user.First_Name+user.Last_Name)
        formdata.append('Program_Graduated_From',user.Program_Graduated)
        formdata.append('Name_Of_Institution_joined',user.Name_Of_Institution_joined)
        formdata.append('Name_Of_Programme_Admitted_To',user.Name_Of_Programme_Admitted_To)
        formdata.append('image',file2);
        axios.put(`http://localhost:4000/highereducation/${user.University_RollNumber}`, formdata)
            .then((response) => {
            const res = response;
            })
            .catch((error) => {
            const res = error;
            });
    }
    const updatePlacement = () =>{
        const formdata = new FormData();
        formdata.append('Id',user.University_RollNumber)
        formdata.append('Year',user.Year)
        formdata.append('Name_of_the_Teacher',user.Name_of_the_Teacher)
        formdata.append('Pay_package_at_appointment',user.Pay_Package_at_appointment)
        formdata.append('Contact_Details',user.Contact_Details)
        formdata.append('Program_graduated_from',user.Program_graduated_from)
        formdata.append('Name_of_company',user.Name_of_company)
        formdata.append('Name_of_employer_with_contact_details',user.Name_of_employer_with_contact_details)
        formdata.append('image',file3);
        axios.put(`http://localhost:4000/placement/${user.University_RollNumber}`, formdata)
            .then((response) => {
            const res = response;
            })
            .catch((error) => {
            const res = error;
            });
    }
    const handleUpdateUser = async () => {
        const formdata = new FormData();
        formdata.append('University_RollNumber',user.University_RollNumber)
        formdata.append('First_Name',user.First_Name)
        formdata.append('Last_Name',user.Last_Name)
        formdata.append('Gender',user.Gender)
        formdata.append('Nationality',user.Nationality)
        formdata.append('DOB',user.DOB)
        formdata.append('Phone_Number',user.Phone_Number)
        formdata.append('Email_ID',user.Email_ID)
        formdata.append('ADHAR_Number',user.ADHAR_Number)
        formdata.append('Address',user.Address)
        formdata.append('District',user.District)
        formdata.append('State',user.State)
        formdata.append('Country',user.Country)
        formdata.append('Pin_Code',user.Pin_Code)
        formdata.append('Category',user.Category)
        formdata.append('Sub_Category',user.Sub_Category)
        formdata.append('_10th_CGPA',user._10th_CGPA)
        formdata.append('_10th_Board',user._10th_Board)
        formdata.append('_10th_YOP',user._10th_YOP)
        formdata.append('_12th_Percentage',user._12th_Percentage)
        formdata.append('_12th_Board',user._12th_Board)
        formdata.append('_12th_YOP',user._12th_YOP)
        formdata.append('Diploma_Percentage',user.Diploma_Percentage)
        formdata.append('Diploma_Board',user.Diploma_Board)
        formdata.append('Diploma_YOP',user.Diploma_YOP)
        formdata.append('Course_RegularORIntegrated',user.Course_RegularORIntegrated)
        formdata.append('Branch',user.Branch)
        formdata.append('College_Name',user.College_Name)
        formdata.append('Course_CGPA',user.Course_CGPA)
        formdata.append('Number_Of_Backlogs',user.Number_Of_Backlogs)
        formdata.append('Entrance_Exam',user.Entrance_Exam)
        formdata.append('CET_Rank',user.CET_Rank)
        formdata.append('Course_YOP',user.Course_YOP)
        formdata.append('StudyingYear',user.StudyingYear)
        formdata.append('Certificate_Course',user.Certificate_Course)
        formdata.append('Certificate_IssuedBy',user.Certificate_IssuedBy)
        formdata.append('CertificatePlatform',user.CertificatePlatform)
        formdata.append('CertificateUpload',file)
        formdata.append('Program_name',user.Program_name)
        formdata.append('Program_code',user.Program_code)
        formdata.append('list_of_students_undertaking',user.First_Name+user.Last_Name)
        formdata.append('InternUpload',file1)
        formdata.append('Year',user.Year)
        formdata.append('Name_of_the_Teacher',user.Name_of_the_Teacher)
        formdata.append('Contact_Details',user.Contact_Details)
        formdata.append('Program_graduated_from',user.Program_graduated_from)
        formdata.append('Name_of_company',user.Name_of_company)
        formdata.append('Name_of_employer_with_contact_details',user.Name_of_employer_with_contact_details)
        formdata.append('Pay_Package_at_appointment',user.Pay_Package_at_appointment)
        formdata.append('NameOfTeacher',user.NameOfTeacher)
        formdata.append('Name_Of_Students',user.First_Name+user.Last_Name)
        formdata.append('Program_Graduated',user.Program_Graduated)
        formdata.append('Name_Of_Institution_joined',user.Name_Of_Institution_joined)
        formdata.append('Name_Of_Programme_Admitted_To',user.Name_Of_Programme_Admitted_To)
        formdata.append('Upload',file2)
        formdata.append('yearforexamination',user.yearforexamination)
        formdata.append('Registeration_Number',user.University_RollNumber)
        formdata.append('NET',user.NET)
        formdata.append('SLET',user.SLET)
        formdata.append('GATE',user.GATE)
        formdata.append('GMAT',user.GMAT)
        formdata.append('CAT',user.CAT)
        formdata.append('GRE',user.GRE)
        formdata.append('JAM',user.JAM)
        formdata.append('IELET',user.IELET)
        formdata.append('TOEFL',user.TOEFL)
        formdata.append('Civil_Services',user.Civil_Services)
        formdata.append('State_government',user.State_government)
        formdata.append('Other_examinations',user.Other_examinations)
        formdata.append('PlaceFile',file3)
        formdata.append('ExamFile',file4)
        if (file!=null) {
            formdata.append('CertificateUpload', file);
        }
        if (file1!=null) {
            formdata.append('InternUpload', file1);
        } 
        if (file2!=null) {
            formdata.append('Upload', file2);
        }
        if (file3!=null) {
            formdata.append('PlaceFile', file3);
        }
        if (file4!=null) {
            formdata.append('ExamFile', file4);
        }
        await axios.put(`http://localhost:4000/btech/${user.University_RollNumber}`,formdata)
        .then(response=>{
            if(response?.status == 200){
                setSystemErrors({...systemErrors,response:'Updated Successfully'});
                updateInternship();
                updateExam();
                updateHigher();
                updatePlacement();
                setTimeout(function() {
                    setSystemErrors({...systemErrors,response:''});
                    setEditing(false);
                }, 2000);
                fetchUser();
            }
            else if(response?.status == 400){
                setSystemErrors({...systemErrors,response:'Error'});
                setTimeout(function() {
                    setSystemErrors({...systemErrors,response:''});
                }, 2000);
            }
        }).catch(error=>{
            if(error?.message=="Network Error"){
                setSystemErrors({...systemErrors,networkError:error?.message})
                setTimeout(function() {
                    setSystemErrors({...systemErrors,networkError:''});
                    setEditing(false);
                }, 2000);
            }
        });
    };
    const access = localStorage.getItem("user_access");
    const handleFileOpen = (filename) => {
        axios.get(`http://localhost:4000/btech/open/${filename}`, {
            responseType: 'blob',
            })
            .then((response) => {
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            })
            .catch((error) => {
            console.log(error);
            });
    };
    useEffect(()=>{
        fetchUser();
    },[]);
    return(
        <>
        {access == "STUDENT_ACCESS" ? (
        <Grid>
            {systemErrors?.networkError?.length>0 && <Alert severity="error" style={{width:'400px', position:"absolute", marginLeft:'920px', marginTop:'2700px'}}>{systemErrors?.networkError}</Alert>}   
            {systemErrors?.response?.length>0 && <Alert severity="success" style={{width:'400px', position:"absolute", marginLeft:'920px', marginTop:'2700px'}}>{systemErrors?.response}</Alert>} 
            <Grid>
                <h2>Account Profile</h2>
                <Button onClick={()=>{setIsLogOutDialogOpen(true)}} style={{marginLeft:"1000px",marginTop:"-90px",position:"absoulte", backgroundColor:"black"}} variant="contained" size="medium">Logout</Button>
                <Grid className="divider">
                    <hr/>
                </Grid>
                <img src="https://cdn-icons-png.flaticon.com/512/16/16363.png" className='image1' style={{height:"100px",width:"100px"}}/>
            </Grid>
            <Grid className='mtech-popup'>
                <Grid>
                    {!editing ?(
                    <FormControl className="mtech-form">
                        <FormLabel className="department-details">Student Form BTECH</FormLabel>
                        <FormLabel className="personal-details">Personal Details</FormLabel>
                            <Grid className = "grid-container">
                                <Grid className="first-grid-item">
                                    <TextField
                                    name="University_RollNumber"
                                    label="University RollNumber"
                                    value={user.University_RollNumber}
                                    />                                            
                                    </Grid>
                                <Grid className="second-grid-item">
                                    <TextField
                                    name="First_Name"
                                    label="First Name"
                                    value={user.First_Name}
                                    />                                            
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField
                                    name="Last_Name"
                                    label="Last Name"
                                    value={user.Last_Name}
                                    />                                            
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField
                                    name="DOB"
                                    label="Date of Birth"
                                    value={user.DOB}
                                    />                                          
                                </Grid>
                            </Grid>
                                <Grid className="gender-container">
                                    <FormLabel className="gender-label">Gender</FormLabel>
                                    <RadioGroup
                                    name="Gender"
                                    value={user.Gender}
                                    >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="Nationality"
                                        label="Nationality"
                                        value={user.Nationality}
                                        />                                            
                                    </Grid>
                                <Grid className="second-grid-item">
                                    <TextField
                                    name="Category"
                                    label="Category"
                                    value={user.Category}
                                    />     
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField
                                    name="Sub_Category"
                                    label="SubCategory"
                                    value={user.Sub_Category}
                                    />   
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField
                                    name="ADHAR_Number"
                                    label="ADHAR Number"
                                    value={user.ADHAR_Number}
                                    />   
                                </Grid>
                            </Grid>
                            <FormLabel className="contact-details">Contact Details</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField
                                    name="Phone_Number"
                                    label="Phone Number"
                                    value={user.Phone_Number}
                                    />   
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField
                                    name="Email_ID"
                                    label="Email ID"
                                    value={user.Email_ID}
                                    />  
                                </Grid>
                            </Grid>
                            <FormLabel className="address-details">Address</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField
                                    name="Address"
                                    label="Address"
                                    value={user.Address}
                                    />  
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField
                                    name="District"
                                    label="District"
                                    value={user.District}
                                    /> 
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField
                                    name="State"
                                    label="State"
                                    value={user.State}
                                    /> 
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField
                                    name="Country"
                                    label="Country"
                                    value={user.Country}
                                    /> 
                                    </Grid>
                                 </Grid>
                                     <Grid className="grid-container">
                                     <Grid className="first-grid-item">
                                        <TextField
                                        name="Pin_Code"
                                        label="PinCode"
                                        value={user.Pin_Code}
                                        />  
                                    </Grid>
                                </Grid>
                                <FormLabel className="secondary-details">Seconday Education</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="_10th_CGPA"
                                        label="10th CGPA"
                                        value={user._10th_CGPA}
                                        />  
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="_10th_Board"
                                        label="10th Board"
                                        value={user._10th_Board}
                                        />  
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="_10th_YOP"
                                        label="10th YOP"
                                        value={user._10th_YOP}
                                        />  
                                    </Grid>
                                </Grid>
                                <FormLabel className="intermediate-details">Intermediate Education</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="_12th_Percentage"
                                        label="12th Percentage"
                                        value={user._12th_Percentage}
                                        />  
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="_12th_Board"
                                        label="12th Board"
                                        value={user._12th_Board}
                                        />  
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="_12th_YOP"
                                        label="12th YOP"
                                        value={user._12th_YOP}
                                        />  
                                    </Grid>
                                </Grid>
                                <FormLabel className="diploma-details">Diploma Education(Optional)</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="Diploma_Percentage"
                                        label="Diploma Percentage"
                                        value={user.Diploma_Percentage}
                                        /> 
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="Diploma_Board"
                                        label="Diploma Board"
                                        value={user.Diploma_Board}
                                        /> 
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="Diploma_YOP"
                                        label="Diploma YOP"
                                        value={user.Diploma_YOP}
                                        /> 
                                    </Grid>
                                </Grid>
                                <FormLabel className="mtech-details">BTECH Details</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="Course_RegularORIntegrated"
                                        label="Course(Regular/Integrated)"
                                        value={user.Course_RegularORIntegrated}
                                        /> 
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="Branch"
                                        label="Branch"
                                        value={user.Branch}
                                        /> 
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="College_Name"
                                        label="College Name"
                                        value={user.College_Name}
                                        /> 
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField
                                        name="Course_CGPA"
                                        label="Course CGPA"
                                        value={user.Course_CGPA}
                                        /> 
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="Number_Of_Backlogs"
                                        label="Number Of Backlogs"
                                        value={user.Number_Of_Backlogs}
                                        /> 
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="Entrance_Exam"
                                        label="Entrance Exam"
                                        value={user.Entrance_Exam}
                                        /> 
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="CET_Rank"
                                        label="CET Rank"
                                        value={user.CET_Rank}
                                        /> 
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField
                                        name="Course_YOP"
                                        label="Year of passing"
                                        value={user.Course_YOP}
                                        /> 
                                    </Grid>
                                </Grid>
                                <Grid className="gender-container">
                                <FormLabel className="gender-label">Studying Year</FormLabel>
                                <RadioGroup 
                                    name = "StudyingYear"
                                    value={user?.StudyingYear}
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
                                            <TextField
                                            name="Certificate_Course"
                                            label="Certificate Course"
                                            value={user.Certificate_Course}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Certificate_IssuedBy"
                                            label="Certificate IssuedBy"
                                            value={user.Certificate_IssuedBy}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="CertificatePlatform"
                                            label="Certificate Platform"
                                            value={user.CertificatePlatform}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                            <Button variant="contained" size="small" style={{marginLeft:'20px',marginTop:'15px'}} onClick={() => handleFileOpen(user?.CertificateUpload)} >Certificate<FileOpen/></Button>
                                        </Grid>
                                    </Grid>
                                    <FormLabel className="internships">Internships</FormLabel>
                                    <Grid className="grid-container">
                                        <Grid className="first-grid-item">
                                            <TextField
                                            name="Program_name"
                                            label="Program_name"
                                            value={user.Program_name}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Program_code"
                                            label="Program_code"
                                            value={user.Program_code}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="list_of_students_undertaking"
                                            label="list_of_students_undertaking"
                                            value={user.list_of_students_undertaking}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                            <Button variant="contained" size="small" style={{marginLeft:'20px',marginTop:'15px'}} onClick={() => handleFileOpen(user?.InternUpload)} >Certificate<FileOpen/></Button>
                                        </Grid>
                                    </Grid>
                                    <FormLabel className="internships">Placements</FormLabel>
                                    <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="Year"
                                        label="Year"
                                        value={user.Year}
                                        /> 
                                    </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Name_of_the_Teacher"
                                            label="Name_of_the_Teacher"
                                            value={user.Name_of_the_Teacher}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="Contact_Details"
                                            label="Contact_Details"
                                            value={user.Contact_Details}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                            <TextField
                                            name="Program_graduated_from"
                                            label="Program_graduated_from"
                                            value={user.Program_graduated_from}
                                            /> 
                                        </Grid>
                                    </Grid>
                                    <Grid className="grid-container">
                                        <Grid className="first-grid-item">
                                            <TextField
                                            name="Name_of_company"
                                            label="Name_of_company"
                                            value={user.Name_of_company}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Name_of_employer_with_contact_details"
                                            label="Name of Employer"
                                            value={user.Name_of_employer_with_contact_details}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="Pay_Package_at_appointment"
                                            label="Pay_Package_at_appointment"
                                            value={user.Pay_Package_at_appointment}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                            <Button variant="contained" size="small" style={{marginLeft:'20px',marginTop:'15px'}} onClick={() => handleFileOpen(user?.PlaceFile)} >OfferLetter<FileOpen/></Button>
                                        </Grid>
                                    </Grid>
                                    <FormLabel className="higher">Higher Education</FormLabel>                                    <Grid className="grid-container">
                                        <Grid className="first-grid-item">
                                            <TextField
                                            name="NameOfTeacher"
                                            label="NameOfTeacher"
                                            value={user.NameOfTeacher}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Name_Of_Students"
                                            label="Name_Of_Students"
                                            value={user.Name_Of_Students}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="Program_Graduated"
                                            label="Program_Graduated"
                                            value={user.Program_Graduated}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                            <TextField
                                            name="Name_Of_Institution_joined"
                                            label="Name_Of_Institution_joined"
                                            value={user.Name_Of_Institution_joined}
                                            /> 
                                        </Grid>
                                    </Grid>
                                    <Grid className="grid-container">
                                        <Grid className="first-grid-item">
                                            <TextField
                                            name="Name_Of_Programme_Admitted_To"
                                            label="Name of program Admitted"
                                            value={user.Name_Of_Programme_Admitted_To}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <Button variant="contained" size="small" style={{marginLeft:'20px',marginTop:'15px'}} onClick={() => handleFileOpen(user?.Upload)} >Upload File<FileOpen/></Button>
                                        </Grid>
                                    </Grid>
                                    <FormLabel className="average">Average percentage of students qualifying in examinations</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "yearforexamination" label="year" value={user?.yearforexamination} inputProps={{ maxLength: 12 }} size="small" ></TextField>
                               
                                    </Grid>
                                    <Grid className="second-grid-item">
                                    <TextField name = "Registeration_Number" type="Number" label="Registeration Number" value={user?.University_RollNumber} inputProps={{ maxLength: 12 }} size="small" ></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel  name = "NET" control={<Checkbox checked = {user?.NET}/>} label="NET" value="NET"/>
                                    </FormGroup>  
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel name = "SLET" control={<Checkbox checked = {user?.SLET}/>} label="SLET" value="SLET"/>
                                    </FormGroup>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel  name = "GATE" control={<Checkbox checked = {user?.GATE}/>} label="GATE" value="GATE"/>
                                    </FormGroup>                                   
                                     </Grid>
                                    <Grid className="second-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel  name = "GMAT" control={<Checkbox checked = {user?.GMAT} />} label="GMAT" value="GMAT"/>
                                    </FormGroup>                                  
                                      </Grid>
                                    <Grid className="third-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel  name = "CAT" control={<Checkbox checked = {user?.CAT}/>} label="CAT" value="CAT"/>
                                    </FormGroup>                                   
                                      </Grid>
                                    <Grid className="fourth-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel  name = "GRE" control={<Checkbox checked = {user?.GRE}/>} label="GRE" value="GRE"/>
                                    </FormGroup>                                   
                                      </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel  name = "JAM" control={<Checkbox checked = {user?.JAM}/>} label="JAM" value="JAM"/>
                                    </FormGroup>                                   
                                     </Grid>
                                    <Grid className="second-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel  name = "IELET" control={<Checkbox checked = {user?.IELET} />} label="IELET" value="IELET"/>
                                    </FormGroup>                                   
                                     </Grid>
                                    <Grid className="third-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel  name = "TOEFL" control={<Checkbox checked = {user?.TOEFL}/>} label="TOEFL" value="TOEFL"/>
                                    </FormGroup>                                   
                                      </Grid>
                                    <Grid className="fourth-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel  name = "Civil_Services" control={<Checkbox checked = {user?.Civil_Services}/>} label="Civil_Services" value="Civil_Services"/>
                                    </FormGroup>                                    
                                     </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel  name = "State_government" control={<Checkbox checked = {user?.State_government}/>} label="State_government" value="State_government"/>
                                    </FormGroup>                                    
                                    </Grid>
                                    <Grid className="second-grid-item">
                                    <FormGroup
                                    >
                                    <FormControlLabel  name = "Other_examinations" control={<Checkbox checked = {user?.Other_examinations} />} label="Other_examinations" value="Other_examinations"/>
                                    </FormGroup>  
                                    </Grid>
                                    <Grid className="third-grid-item">
                                            <Button variant="contained" size="small" style={{marginLeft:'20px',marginTop:'15px'}} onClick={() => handleFileOpen(user?.ExamFile)} >Certificate<FileOpen/></Button>
                                        </Grid>
                                </Grid>
                                    <Grid className="submit-button">
                                        <Button variant="contained" style={{ minWidth:'200px', marginLeft:"900px", backgroundColor:"black"}} onClick={() => setEditing(true)}>
                                        Edit
                                        </Button>
                                    </Grid>
                        </FormControl>
                    ):(
                        <Grid>
                        <FormControl className="mtech-form">
                        <FormLabel className="department-details">Student Form BTECH</FormLabel>
                        <FormLabel className="personal-details">Personal Details</FormLabel>
                            <Grid className = "grid-container">
                                <Grid className="first-grid-item">
                                    <TextField
                                    name="University_RollNumber"
                                    label="University RollNumber"
                                    value={user.University_RollNumber}
                                    />                                            
                                    </Grid>
                                <Grid className="second-grid-item">
                                    <TextField
                                    name="First_Name"
                                    label="First Name"
                                    value={user.First_Name}
                                    />                                            
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField
                                    name="Last_Name"
                                    label="Last Name"
                                    value={user.Last_Name}
                                    />                                            
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField
                                    name="DOB"
                                    label="Date of Birth"
                                    value={user.DOB}
                                    />                                          
                                </Grid>
                            </Grid>
                                <Grid className="gender-container">
                                    <FormLabel className="gender-label">Gender</FormLabel>
                                    <RadioGroup
                                    name="Gender"
                                    value={user.Gender}
                                    onChange={(e)=>{onChangeRadioGroup(e)}}
                                    >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="Nationality"
                                        label="Nationality"
                                        value={user.Nationality}
                                        />                                            
                                    </Grid>
                                <Grid className="second-grid-item">
                                    <TextField
                                    name="Category"
                                    label="Category"
                                    value={user.Category}
                                    />     
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField
                                    name="Sub_Category"
                                    label="SubCategory"
                                    value={user.Sub_Category}
                                    />   
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField
                                    name="ADHAR_Number"
                                    label="ADHAR Number"
                                    value={user.ADHAR_Number}
                                    />   
                                </Grid>
                            </Grid>
                            <FormLabel className="contact-details">Contact Details</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField
                                    name="Phone_Number"
                                    value={user.Phone_Number}
                                    label="Phone Number"
                                    onChange={(e)=>{onChangeTextField(e)}}
                                    />   
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField
                                    name="Email_ID"
                                    label="Email ID"
                                    value={user.Email_ID}
                                    />  
                                </Grid>
                            </Grid>
                            <FormLabel className="address-details">Address</FormLabel>
                            <Grid className="grid-container">
                                <Grid className="first-grid-item">
                                    <TextField
                                    name="Address"
                                    label="Address"
                                    value={user.Address}
                                    onChange={(e)=>{onChangeTextField(e)}}
                                    />  
                                </Grid>
                                <Grid className="second-grid-item">
                                    <TextField
                                    name="District"
                                    value={user.District}
                                    label="District"
                                    onChange={(e)=>{onChangeTextField(e)}}
                                    /> 
                                </Grid>
                                <Grid className="third-grid-item">
                                    <TextField
                                    name="State"
                                    value={user.State}
                                    label="State"
                                    onChange={(e)=>{onChangeTextField(e)}}
                                    /> 
                                </Grid>
                                <Grid className="fourth-grid-item">
                                    <TextField
                                    name="Country"
                                    value={user.Country}
                                    label="Country"
                                    onChange={(e)=>{onChangeTextField(e)}}
                                    /> 
                                    </Grid>
                                 </Grid>
                                     <Grid className="grid-container">
                                     <Grid className="first-grid-item">
                                        <TextField
                                        name="Pin_Code"
                                        value={user.Pin_Code}
                                        label="PinCode"
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        />  
                                    </Grid>
                                </Grid>
                                <FormLabel className="secondary-details">Seconday Education</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="_10th_CGPA"
                                        label="10th CGPA"
                                        value={user._10th_CGPA}
                                        />  
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="_10th_Board"
                                        value={user._10th_Board}
                                        label="10th Board"
                                        />  
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="_10th_YOP"
                                        label="10th YOP"
                                        value={user._10th_YOP}
                                        />  
                                    </Grid>
                                </Grid>
                                <FormLabel className="intermediate-details">Intermediate Education</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="_12th_Percentage"
                                        label="12th Percentage"
                                        value={user._12th_Percentage}
                                        />  
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="_12th_Board"
                                        label="12th Board"
                                        value={user._12th_Board}
                                        />  
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="_12th_YOP"
                                        value={user._12th_YOP}
                                        label="12th YOP"
                                        />  
                                    </Grid>
                                </Grid>
                                <FormLabel className="diploma-details">Diploma Education(Optional)</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="Diploma_Percentage"
                                        label="Diploma Percentage"
                                        value={user.Diploma_Percentage}
                                        /> 
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="Diploma_Board"
                                        value={user.Diploma_Board}
                                        label="Diploma Board"
                                        /> 
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="Diploma_YOP"
                                        value={user.Diploma_YOP}
                                        label="Diploma YOP"
                                        /> 
                                    </Grid>
                                </Grid>
                                <FormLabel className="mtech-details">BTECH Details</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="Course_RegularORIntegrated"
                                        value={user.Course_RegularORIntegrated}
                                        label="Course(Regular/Integrated)"
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="Branch"
                                        value={user.Branch}
                                        label="Branch"
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="College_Name"
                                        label="College Name"
                                        value={user.College_Name}
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField
                                        name="Course_CGPA"
                                        label="Course CGPA"
                                        value={user.Course_CGPA}
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="Number_Of_Backlogs"
                                        label="Number Of Backlogs"
                                        value={user.Number_Of_Backlogs}
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="Entrance_Exam"
                                        label="Entrance Exam"
                                        value={user.Entrance_Exam}
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="CET_Rank"
                                        value={user.CET_Rank}
                                        label="CET Rank"
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField
                                        name="Course_YOP"
                                        label="YOP"
                                        value={user.Course_YOP}
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                </Grid>
                                <Grid className="gender-container">
                                <FormLabel className="gender-label">Studying Year</FormLabel>
                                <RadioGroup 
                                    name = "StudyingYear"
                                    value={user?.StudyingYear}
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
                                            <TextField
                                            name="Certificate_Course"
                                            value={user.Certificate_Course}
                                            label="Certificate Course"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Certificate_IssuedBy"
                                            value={user.Certificate_IssuedBy}
                                            label="Certificate IssuedBy"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="CertificatePlatform"
                                            label="Certificate Platform"
                                            value={user.CertificatePlatform}
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                            <TextField type='file' name='CertificateUpload' label="Upload Certificates(pdf only)" InputLabelProps={{shrink:true}} onChange={handleFile}></TextField>
                                        </Grid>
                                    </Grid>
                                    <FormLabel className="internships">Internships</FormLabel>
                                    <Grid className="grid-container">
                                        <Grid className="first-grid-item">
                                            <TextField
                                            name="Program_name"
                                            value={user.Program_name}
                                            label="Program_name"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Program_code"
                                            label="Program_code"
                                            value={user.Program_code}
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="list_of_students_undertaking"
                                            label="list_of_students_undertaking"
                                            value={user.list_of_students_undertaking}
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                        <TextField type='file' name='InternUpload' label="Certificates(pdf only)" InputLabelProps={{shrink:true}} onChange={handleFile1}></TextField>
                                        </Grid>
                                    </Grid>
                                    <FormLabel className="internships">Placements</FormLabel>
                                    <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="Year"
                                        label="Year"
                                        value={user.Year}
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Name_of_the_Teacher"
                                            label="Name_of_the_Teacher"
                                            value={user.Name_of_the_Teacher}
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="Contact_Details"
                                            label="Contact_Details"
                                            value={user.Contact_Details}
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                            <TextField
                                            name="Program_graduated_from"
                                            label="Program_graduated_from"
                                            value={user.Program_graduated_from}
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                    </Grid>
                                    <Grid className="grid-container">
                                        <Grid className="first-grid-item">
                                            <TextField
                                            name="Name_of_company"
                                            label="Name_of_company"
                                            value={user.Name_of_company}
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Name_of_employer_with_contact_details"
                                            label="Employer name and contact"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            value={user.Name_of_employer_with_contact_details}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="Pay_Package_at_appointment"
                                            label="Pay_Package_at_appointment"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            value={user.Pay_Package_at_appointment}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                        <TextField type='file' name='PlaceFile' label="OfferLetter(pdf only)" InputLabelProps={{shrink:true}} onChange={handleFile3}></TextField>
                                        </Grid>
                                    </Grid>
                                    <FormLabel className="higher">Higher Education</FormLabel>                                   
                                     <Grid className="grid-container">
                                        <Grid className="first-grid-item">
                                            <TextField
                                            name="NameOfTeacher"
                                            label="NameOfTeacher"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            value={user.NameOfTeacher}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Name_Of_Students"
                                            label="Name_Of_Students"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            value={user.Name_Of_Students}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="Program_Graduated"
                                            label="Program_Graduated"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            value={user.Program_Graduated}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                            <TextField
                                            name="Name_Of_Institution_joined"
                                            label="Name_Of_Institution_joined"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            value={user.Name_Of_Institution_joined}
                                            /> 
                                        </Grid>
                                    </Grid>
                                    <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                            <TextField
                                            name="Name_Of_Programme_Admitted_To"
                                            label="Name of Program Admitted"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            value={user.Name_Of_Programme_Admitted_To}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                        <TextField type='file' name='Upload' label="ID Card/Admission letter" InputLabelProps={{shrink:true}} onChange={handleFile2}></TextField>
                                        </Grid>
                                </Grid>
                                <FormLabel className="average">Average percentage of students qualifying in examinations</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                    <TextField
                                        name="yearforexamination"
                                        label="Year"
                                        value={user.yearforexamination}
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        />                                
                                    </Grid>
                                    <Grid className="second-grid-item">
                                    <TextField name = "Registeration_Number" type="Number" label="Registeration Number" onChange={(e)=>{onChangeTextField(e)}} value={user?.University_RollNumber} inputProps={{ maxLength: 12 }} size="small" ></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel  name = "NET" control={<Checkbox checked = {user?.NET}/>} label="NET" value="NET"/>
                                    </FormGroup>  
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel name = "SLET" control={<Checkbox checked = {user?.SLET}/>} label="SLET" value="SLET"/>
                                    </FormGroup>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel  name = "GATE" control={<Checkbox checked = {user?.GATE}/>} label="GATE" value="GATE"/>
                                    </FormGroup>                                   
                                     </Grid>
                                    <Grid className="second-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel  name = "GMAT" control={<Checkbox checked = {user?.GMAT} />} label="GMAT" value="GMAT"/>
                                    </FormGroup>                                  
                                      </Grid>
                                    <Grid className="third-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel  name = "CAT" control={<Checkbox checked = {user?.CAT}/>} label="CAT" value="CAT"/>
                                    </FormGroup>                                   
                                      </Grid>
                                    <Grid className="fourth-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel  name = "GRE" control={<Checkbox checked = {user?.GRE}/>} label="GRE" value="GRE"/>
                                    </FormGroup>                                   
                                      </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel  name = "JAM" control={<Checkbox checked = {user?.JAM}/>} label="JAM" value="JAM"/>
                                    </FormGroup>                                   
                                     </Grid>
                                    <Grid className="second-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel  name = "IELET" control={<Checkbox checked = {user?.IELET} />} label="IELET" value="IELET"/>
                                    </FormGroup>                                   
                                     </Grid>
                                    <Grid className="third-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel  name = "TOEFL" control={<Checkbox checked = {user?.TOEFL}/>} label="TOEFL" value="TOEFL"/>
                                    </FormGroup>                                   
                                      </Grid>
                                    <Grid className="fourth-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel  name = "Civil_Services" control={<Checkbox checked = {user?.Civil_Services}/>} label="Civil_Services" value="Civil_Services"/>
                                    </FormGroup>                                    
                                     </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel  name = "State_government" control={<Checkbox checked = {user?.State_government}/>} label="State_government" value="State_government"/>
                                    </FormGroup>                                    
                                    </Grid>
                                    <Grid className="second-grid-item">
                                    <FormGroup
                                        onChange={(e)=>{onChangeCheckboxGroup(e)}}
                                    >
                                    <FormControlLabel  name = "Other_examinations" control={<Checkbox checked = {user?.Other_examinations} />} label="Other_examinations" value="Other_examinations"/>
                                    </FormGroup>  
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField type='file' name='ExamFile' label="File(pdf only)" InputLabelProps={{shrink:true}} onChange={handleFile4}></TextField>
                                    </Grid>
                                </Grid>
                                    <Grid className="submit-button">
                                        <Button variant="contained" style={{ minWidth:'200px', marginLeft:"900px", backgroundColor:"black"}} onClick={handleUpdateUser}>
                                        Save
                                        </Button>
                                    </Grid>
                        </FormControl>
                        </Grid>
                    )}
                    </Grid>
                </Grid>
                <Dialog 
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "400px", 
                            marginLeft:"80px"
                        },
                    },
                }} onClose={handleLogOutClose} open={isLogOutDialogOpen}>
                <DialogContent>
                    <DialogContentText>
                        Do you want to Logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" className="button"  onClick={handleLogOut}>Logout</Button>
                    <Button variant="contained" className="button" onClick={handleLogOutClose}>Stay</Button>
                </DialogActions>
            </Dialog>
        </Grid> ):(
            <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    );
};
export default BtechHome;