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

const MtechHome = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [isLogOutDialogOpen,setIsLogOutDialogOpen] = useState(false);
    const handleLogOut = () => {
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
    });
    const [editing, setEditing] = useState(false);
    const [file,setFile] = useState(null);
    const [file1,setFile1] = useState(null);
    const [file2,setFile2] = useState(null);
    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }
    const handleFile1=(e)=>{
        setFile1(e.target.files[0]);
    }
    const handleFile2=(e)=>{
        setFile2(e.target.files[0]);
    }
    const [systemErrors,setSystemErrors] = useState("");
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert ref={ref} variant="filled" {...props} />;
    });
    const fetchUser = async() =>{
        try{
            const response =await axios.get(`http://localhost:4000/mtech/email/${userDetails.Admin_EmailID}`);
            setUser(response?.data[0]);
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
    const onChangeRadioGroup = (e) => {
        setUser({...user,Gender:e.target.value})
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
        formdata.append('DegreeCourse',user.DegreeCourse)
        formdata.append('Branch',user.Branch)
        formdata.append('College_Name',user.College_Name)
        formdata.append('Course_CGPA',user.Course_CGPA)
        formdata.append('Entrance_Exam',user.Entrance_Exam)
        formdata.append('CET_Rank',user.CET_Rank)
        formdata.append('Course_YOP',user.Course_YOP)
        formdata.append('MTECH_College',user.MTECH_College)
        formdata.append('Department',user.Department)
        formdata.append('MTECH_Specialization',user.MTECH_Specialization)
        formdata.append('MTECH_NumberOF_Backlogs',user.MTECH_NumberOF_Backlogs)
        formdata.append('MTECH_CGPA',user.MTECH_CGPA)
        formdata.append('YOP',user.YOP)
        formdata.append('Certificate_Course',user.Certificate_Course)
        formdata.append('Certificate_IssuedBy',user.Certificate_IssuedBy)
        formdata.append('CertificatePlatform',user.CertificatePlatform)
        formdata.append('CertificateUpload',file)
        formdata.append('NumberOfCompanies',user.NumberOfCompanies)
        formdata.append('Company',user.Company)
        formdata.append('Package',user.Package)
        formdata.append('Upload',file1);
        formdata.append('InternCompany',user.InternCompany)
        formdata.append('InternDuration',user.InternDuration)
        formdata.append('InternUpload',file2)
        if (file!=null) {
            formdata.append('CertificateUpload', file);
        }
          
        if (file1!=null) {
            formdata.append('Upload', file1);
        }
          
        if (file2!=null) {
            formdata.append('InternUpload', file2);
        }
        await axios.put(`http://localhost:4000/mtech/${user.University_RollNumber}`, formdata)
        .then(response=>{
            if(response?.status == 200){
                setSystemErrors({...systemErrors,response:'Updated Successfully'});
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
    const handleFileOpen = (filename) => {
        axios.get(`http://localhost:4000/mtech/open/${filename}`, {
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
        <Grid>
            {systemErrors?.networkError?.length>0 && <Alert severity="error" style={{width:'400px', position:"absolute", marginLeft:'920px', marginTop:'2000px'}}>{systemErrors?.networkError}</Alert>}   
            {systemErrors?.response?.length>0 && <Alert severity="success" style={{width:'400px', position:"absolute", marginLeft:'920px', marginTop:'2000px'}}>{systemErrors?.response}</Alert>} 
            <Grid>
                <h2>Account Profile</h2>
                <Button onClick={()=>{setIsLogOutDialogOpen(true)}} style={{marginLeft:"1100px",marginTop:"-90px",backgroundColor:"black"}} variant="contained" size="medium">Logout</Button>
                <Grid className="divider">
                    <hr/>
                </Grid>
                <img src="https://cdn-icons-png.flaticon.com/512/16/16363.png" className='image1' style={{height:"100px",width:"100px"}}/>
            </Grid>
            <Grid className='mtech-popup'>
                <Grid>
                    {!editing ?(
                    <FormControl className="mtech-form">
                        <FormLabel className="department-details">Student Form MTECH</FormLabel>
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
                                <FormLabel className="mtech-details">Graduation</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField
                                        name="DegreeCourse"
                                        label="Degree Course"
                                        value={user.DegreeCourse}
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
                                        name="Entrance_Exam"
                                        label="Entrance Exam"
                                        value={user.Number_Of_Backlogs}
                                        /> 
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="CET_Rank"
                                        label="CET Rank"
                                        value={user.Entrance_Exam}
                                        /> 
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="Course_YOP"
                                        label="Yop"
                                        value={user.CET_Rank}
                                        /> 
                                    </Grid>
                                </Grid>
                                <FormLabel className="mtech-details">MTECH Details</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "MTECH_College" value={user?.MTECH_College} label="College Name" size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Department" value={user?.Department} label="Department" size="small" required></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "MTECH_Specialization" value={user?.MTECH_Specialization} label="Specialization" size="small" required></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "MTECH_NumberOF_Backlogs" value={user?.MTECH_NumberOF_Backlogs} label="Number Of Backlogs" type="Number" size="small" required></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "MTECH_CGPA" value={user?.MTECH_CGPA} label="CGPA" size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "YOP" value={user?.YOP} label="Yop" size="small" required></TextField>

                                    </Grid>
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
                                            name="InternCompany"
                                            label="Company"
                                            value={user.InternCompany}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="InternDuration"
                                            label="Duration"
                                            value={user.InternDuration}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <Button variant="contained" size="small" style={{marginLeft:'20px',marginTop:'15px'}} onClick={() => handleFileOpen(user?.InternUpload)} >Certificate<FileOpen/></Button>
                                            
                                        </Grid>
                                    </Grid>
                                    <FormLabel className="placements">Placement Details</FormLabel>
                                    <Grid className="grid-container">
                                        <Grid className="first-grid-item">
                                            <TextField
                                            name="NumberOfCompanies"
                                            label="Number of Companies"
                                            value={user.NumberOfCompanies}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Company"
                                            label="Company Name"
                                            value={user.Company}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="Package"
                                            label="Package"
                                            value={user.Package}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                            <Button variant="contained" size="small" style={{marginLeft:'20px',marginTop:'15px'}} onClick={() => handleFileOpen(user?.Upload)} >OfferLetter<FileOpen/></Button>
                                            
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
                                        name="DegreeCourse"
                                        value={user.DegreeCourse}
                                        label="Degree Course"
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
                                        name="Entrance_Exam"
                                        label="Entrance Exam"
                                        value={user.Entrance_Exam}
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField
                                        name="CET_Rank"
                                        label="CET Rank"
                                        value={user.CET_Rank}
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField
                                        name="Course_YOP"
                                        value={user.Course_YOP}
                                        label="Course_YOP"
                                        onChange={(e)=>{onChangeTextField(e)}}
                                        /> 
                                    </Grid>
                                </Grid>
                                <FormLabel className="mtech-details">MTECH Details</FormLabel>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "MTECH_College" onChange={(e)=>{onChangeTextField(e)}} value={user?.MTECH_College} label="College Name" size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "Department" onChange={(e)=>{onChangeTextField(e)}} value={user?.Department} label="Department" size="small" required></TextField>
                                    </Grid>
                                    <Grid className="third-grid-item">
                                        <TextField name = "MTECH_Specialization" onChange={(e)=>{onChangeTextField(e)}} value={user?.MTECH_Specialization} label="Specialization" size="small" required></TextField>
                                    </Grid>
                                    <Grid className="fourth-grid-item">
                                        <TextField name = "MTECH_NumberOF_Backlogs" onChange={(e)=>{onChangeTextField(e)}} value={user?.MTECH_NumberOF_Backlogs} label="Number Of Backlogs" type="Number" size="small" required></TextField>
                                    </Grid>
                                </Grid>
                                <Grid className="grid-container">
                                    <Grid className="first-grid-item">
                                        <TextField name = "MTECH_CGPA" value={user?.MTECH_CGPA} onChange={(e)=>{onChangeTextField(e)}} label="CGPA" size="small" required></TextField>
                                    </Grid>
                                    <Grid className="second-grid-item">
                                        <TextField name = "YOP" value={user?.YOP} label="Yop" onChange={(e)=>{onChangeTextField(e)}} size="small" required></TextField>

                                    </Grid>
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
                                            name="InternCompany"
                                            label="Company"
                                            value={user.InternCompany}
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="InternDuration"
                                            value={user.InternDuration}
                                            label="Duration"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField type='file' name='InternUpload' label="Upload Certificates(pdf only)" InputLabelProps={{shrink:true}} onChange={handleFile1}></TextField>
                                        </Grid>
                                    </Grid>
                                    <FormLabel className="placements">Placement Details</FormLabel>
                                    <Grid className="grid-container">
                                        <Grid className="first-grid-item">
                                            <TextField
                                            name="NumberOfCompanies"
                                            label="Number Of Companies"
                                            value={user.NumberOfCompanies}
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="second-grid-item">
                                            <TextField
                                            name="Company"
                                            value={user.Company}
                                            label="Company"
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="third-grid-item">
                                            <TextField
                                            name="Package"
                                            label="Package"
                                            value={user.Package}
                                            onChange={(e)=>{onChangeTextField(e)}}
                                            /> 
                                        </Grid>
                                        <Grid className="fourth-grid-item">
                                            <TextField type='file' name='Upload' label="Upload OfferLetters(pdf only)" InputLabelProps={{shrink:true}} onChange={handleFile2}></TextField>
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
        </Grid>
    );
};
export default MtechHome;