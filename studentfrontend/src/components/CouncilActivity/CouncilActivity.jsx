import logo from '../logo.jpg'
import Grid from '@material-ui/core/Grid'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom'; 
import dayjs from 'dayjs'; 
import {useLocation} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CouncilActivity = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [dateOfBirth,setDateOfBirth] = useState(null);
    const access = localStorage.getItem("user_access");
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const [file,setFile] = useState();
    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }
    const student= location?.state?.student ||{
        StudentCouncil_Name:"",
        Date_Of_Establishment:"",
        Activities:"",
        ProofsOREvidencesOrWebLinks:""
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
        formdata.append('StudentCouncil_Name',registerRequestBody.StudentCouncil_Name)
        formdata.append('Date_Of_Establishment',registerRequestBody.Date_Of_Establishment)
        formdata.append('Activities',registerRequestBody.Activities)
        formdata.append('image',file);
        let res = {};
        if(editData){
            await axios.put(`http://localhost:4000/councilactivities/${student.StudentCouncil_Name}`, formdata)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewcouncil")
                }, 2000);
            }
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
                setTimeout(function() {
                    // window.location.reload(false);
                }, 2000);
            }
        }else{
            await axios.post('http://localhost:4000/councilactivities', formdata)
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
                    // window.location.reload(false);
                }, 2000);
            }
        }
    }
    useEffect(()=>{
        if(editData){
            setDateOfBirth(dayjs(student.Date_Of_Establishment));
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
                    <FormControl className="pass-form">
                            <Grid className="first-grid">
                                <TextField name = "StudentCouncil_Name" value={registerRequestBody?.StudentCouncil_Name} label="Student Council Name" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="large"></TextField>
                            </Grid>
                            <Grid className="first-name">
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
                                        setRegisterRequestBody({...registerRequestBody,Date_Of_Establishment:dob});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Activities" value={registerRequestBody?.Activities} label="Activities" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="large"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                            <Button variant="contained" className="first-name" size="small" ><input type="file" name="image" onChange={handleFile}/></Button>
                            <Button variant="contained" className="button1" size="medium" onClick={handleSubmit}>Submit</Button>
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
        </Grid> ):(
            <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    )
}

export default CouncilActivity;
