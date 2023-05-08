import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes  from 'prop-types';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'; 
import { useNavigate } from 'react-router-dom'; 
import {useLocation} from 'react-router-dom'
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ValueAddedCommon = (url,url1) =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const student= location?.state?.student ||{
        Name_Of_ValueAddedCourses_Offered:"",
        Course_Code:"",
        Yr_Of_Offering:"",
        Num_Of_times_Offered_DuringSameYr:"",
        Duration_Of_Course:"",
        Num_Of_Students_Enrolled_In_Yr:"",
        Num_Of_Students_Completed:""
    };
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const editData = location?.state?.student ? true : false;
    const [registerRequestBody,setRegisterRequestBody] = useState(student);
    const handleSubmit = async() => {
        let res = {};
        if(editData){
            await axios.put(url`/${student.Course_Code}`, registerRequestBody)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate(url1)
                }, 2000);
            }
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
            }
        }else{
            await axios.post(url, registerRequestBody)
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
            }
        }
    }
    useEffect(()=>{
        if(editData){
            const year = Number(student.Yr_Of_Offering) - 1;
            setDateOfBirth(dayjs(year+"-12-31T18:30:00.000Z"));
        }
    },[]);
    return (
        <Grid>
            <Grid className="stu">
            <Button variant="contained" color="primary" size="large" onClick={()=>{navigate(-1)}} className="buttonnew"><ArrowBackIcon/>BACK</Button>
            </Grid>
            <Grid className='demand-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="activities-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                    <FormControl className="register-form">
                            <Grid className="first-grid">
                                <TextField name = "Name_Of_ValueAddedCourses_Offered" value={registerRequestBody?.Name_Of_ValueAddedCourses_Offered} label="Name Of Value Added Course" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Course_Code" value={registerRequestBody?.Course_Code} type="Number" InputProps={{ sx: { width: 250 } }} label="Course Code" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Year Of Offering"
                                        value={dateOfBirth}
                                        views={['year']}
                                        name="small"
                                        onChange={(newValue)=>{
                                        setDateOfBirth(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        setRegisterRequestBody({...registerRequestBody,Yr_Of_Offering:year});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Num_Of_times_Offered_DuringSameYr" value={registerRequestBody?.Num_Of_times_Offered_DuringSameYr} type="Number" label="Number Of times Offered" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Duration_Of_Course" value={registerRequestBody?.Duration_Of_Course} label="Duration" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Num_Of_Students_Enrolled_In_Yr" value={registerRequestBody?.Num_Of_Students_Enrolled_In_Yr} type="Number" label="Number Of Students Enrolled" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Num_Of_Students_Completed" value={registerRequestBody?.Num_Of_Students_Completed} type="Number" label="Number Of Students Completed" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="small"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" className="button" onClick={handleSubmit} color="success">Submit</Button>
                            </Grid>
                    </FormControl>
                </Grid>
                    {toastMessage?.message.length > 0 && 
                        <Alert sx={{ marginTop: '-150px',position:"fixed",marginRight:"300px" , minWidth:'500px'}} severity={toastMessage?.type}>
                            <AlertTitle>{toastMessage?.type}</AlertTitle>
                            <strong>{toastMessage?.message}</strong>
                        </Alert>
                    }
            </Grid>
        </Grid>
    )
}
ValueAddedCommon.propTypes = {
    url: PropTypes.string 
};
ValueAddedCommon.defaultPropTypes = {
    url: ""
};
export default ValueAddedCommon;