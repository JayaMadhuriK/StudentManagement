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
import { useNavigate } from 'react-router-dom'; 
import dayjs from 'dayjs';
import {useLocation} from 'react-router-dom' 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const HigherEdu = () =>{
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const location = useLocation();
    const navigate = useNavigate();
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const [file,setFile] = useState();
    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }
    const student= location?.state?.student ||{
        NameOfTeacher:"",
        NumberOf_Students_Enrolled:"",
        Name_Of_Students:"",
        Program_Graduated_From:"",
        Name_Of_Institution_joined:"",
        Name_Of_Programme_Admitted_To:"",
        IdentityCardORAdmissionLetter:""
    };
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const editData = location?.state?.student ? true : false;
    const [registerRequestBody,setRegisterRequestBody] = useState(student);
     const handleSubmit = async() => {
        const formdata = new FormData();
        formdata.append('NameOfTeacher',registerRequestBody.NameOfTeacher)
        formdata.append('NumberOf_Students_Enrolled',registerRequestBody.NumberOf_Students_Enrolled)
        formdata.append('Name_Of_Students',registerRequestBody.Name_Of_Students)
        formdata.append('Program_Graduated_From',registerRequestBody.Program_Graduated_From)
        formdata.append('Name_Of_Institution_joined',registerRequestBody.Name_Of_Institution_joined)
        formdata.append('Name_Of_Programme_Admitted_To',registerRequestBody.Name_Of_Programme_Admitted_To)
        formdata.append('image',file);
        let res = {};
        if(editData){
            await axios.put(`http://localhost:4000/highereducation/${student.NameOfTeacher}`, registerRequestBody)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewhigher")
                }, 2000);
            }
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
                setTimeout(function() {
                    window.location.reload(false);
                }, 2000);
            }
        }else{
            await axios.post('http://localhost:4000/highereducation', formdata)
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
            const year = Number(student.Program_Graduated_From) - 1;
            setDateOfBirth(dayjs(year+"-12-31T18:30:00.000Z"));
        }
    },[]);
    return (
        <Grid>
            <Grid className="stu">
            <Button variant="contained" color="primary" size="large" onClick={()=>{navigate(-1)}} className="buttonnew"><ArrowBackIcon/>BACK</Button>
            </Grid>
            <Grid className='activity-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="activities-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                    <FormControl className="register-form">
                            <Grid className="first-grid">
                                <TextField name = "NameOfTeacher" value={registerRequestBody?.NameOfTeacher} label="Name Of Teacher" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "NumberOf_Students_Enrolled" value={registerRequestBody?.NumberOf_Students_Enrolled} type="Number" InputProps={{ sx: { width: 250 } }} label="Number Of Students Enrolled" onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_Of_Students" label="Name Of Students" value={registerRequestBody?.Name_Of_Students} InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Program Graduated From"
                                        value={dateOfBirth}
                                        views={['year']}
                                        name="small"
                                        onChange={(newValue)=>{
                                        setDateOfBirth(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        setRegisterRequestBody({...registerRequestBody,Program_Graduated_From:year});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_Of_Institution_joined" value={registerRequestBody?.Name_Of_Institution_joined} label="Name Of Institution joined" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_Of_Programme_Admitted_To" value={registerRequestBody?.Name_Of_Programme_Admitted_To}label="Name Of Programme Admitted To" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" className="first-name" size="small" ><input type="file" name="image" onChange={handleFile}/></Button>
                                <Button variant="contained" className="button" onClick={handleSubmit}>Submit</Button>
                            </Grid>
                    </FormControl>
                </Grid>
                    {toastMessage?.message.length > 0 && 
                        <Alert sx={{ marginTop: '-250px',position:"fixed",marginRight:"300px" , minWidth:'500px'}} severity={toastMessage?.type}>
                            <AlertTitle>{toastMessage?.type}</AlertTitle>
                            <strong>{toastMessage?.message}</strong>
                        </Alert>
                    }
            </Grid>
        </Grid>
    )
}

export default HigherEdu;