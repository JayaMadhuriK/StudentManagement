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
import {useLocation} from 'react-router-dom'
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Awards = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const student = location?.state?.student || {
        Id:"",
        Year:"",
        Name_Of_Award:"",
        TeamORIndividual:"",
        InterUniversity_State_National_International:"",
        Name_Of_Event:"",
        Name_Of_Student:"",
        University_RollNumber:"",
        E_Copy_Of_Award_Letter:"",
    };
    const [file,setFile] = useState(location?.state?.student ? null : null);
    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }
    const editData = location?.state?.student ? true : false;
    const [registerRequestBody,setRegisterRequestBody] = useState(student);
    const [dateOfBirth,setDateOfBirth] = useState(null);
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const access = localStorage.getItem("user_access");
    const handleSubmit = async() => {
        const formdata = new FormData();
        formdata.append('Id',registerRequestBody.Id)
        formdata.append('Year',registerRequestBody.Year)
        formdata.append('Name_Of_Award',registerRequestBody.Name_Of_Award)
        formdata.append('TeamORIndividual',registerRequestBody.TeamORIndividual)
        formdata.append('InterUniversity_State_National_International',registerRequestBody.InterUniversity_State_National_International)
        formdata.append('Name_Of_Event',registerRequestBody.Name_Of_Event)
        formdata.append('Name_Of_Student',registerRequestBody.Name_Of_Student)
        formdata.append('University_RollNumber',registerRequestBody.University_RollNumber)
        formdata.append('image',file);
        let res = {};
        if(editData){
            await axios.put(`http://localhost:4000/awards/${student.Id}`, formdata)
            .then((response) => {
             res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewawards")
                }, 2000);
            }
            else{
                setToastMessage({...toastMessage, message:"Error in Entry......",type:"error"});
                setTimeout(function() {
                    // window.location.reload(false);
                }, 2000);
            }
        }else{
            await axios.post('http://localhost:4000/awards', formdata)
            .then((response) => {
                res = response;
            })
            .catch((error) => {
                res = error;
            });
            console.log(res);
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Submitted" ,type:"success"});
                setTimeout(function() {
                    // window.location.reload(false);
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
            const year = Number(student.Year) - 1;
            setDateOfBirth(dayjs(year+"-12-31T18:30:00.000Z"));
        }
    },[]);
    return (
        <>
        {access == "ADMIN_ACCESS" ? (
        <Grid>
            <Grid className="stu">
            <Button variant="contained" color="primary" size="large" onClick={()=>{navigate(-1)}} className="buttonnew"><ArrowBackIcon/>BACK</Button>
            </Grid>
            <Grid className='awards-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="activities-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                    <FormControl className="register-form">
                            <Grid className="first-grid">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Year"
                                        value={dateOfBirth}
                                        views={['year']}
                                        name="small"
                                        onChange={(newValue)=>{
                                        setDateOfBirth(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        setRegisterRequestBody({...registerRequestBody,Year:year});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_Of_Award" value={registerRequestBody?.Name_Of_Award} label="Name Of Award" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "TeamORIndividual" value={registerRequestBody?.TeamORIndividual} label="Team/Individual" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "InterUniversity_State_National_International" value={registerRequestBody?.InterUniversity_State_National_International} label="InterUniversity/State/National/International" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}}  size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_Of_Event" label="Name Of Event" value={registerRequestBody?.Name_Of_Event} onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_Of_Student" label="Name Of Student" value={registerRequestBody?.Name_Of_Student} onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "University_RollNumber" type="Number" value={registerRequestBody?.University_RollNumber} label="University RollNumber" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" className="first-name" size="small" ><input type="file" name="image" onChange={handleFile}/></Button>
                                <Button variant="contained" className="button" onClick={handleSubmit}>Submit</Button>
                            </Grid>
                    </FormControl>
                </Grid>
                    {toastMessage?.message.length > 0 && 
                        <Alert sx={{ marginTop: '-300px',position:"fixed",marginRight:"300px" , minWidth:'500px'}} severity={toastMessage?.type}>
                            <AlertTitle>{toastMessage?.type}</AlertTitle>
                            <strong>{toastMessage?.message}</strong>
                        </Alert>
                    }
            </Grid>
        </Grid>
        ):(
            <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    )
}

export default Awards;