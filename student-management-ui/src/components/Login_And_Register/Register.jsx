import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import './Register.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Register = () =>{
    const navigate = useNavigate();
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const [registerRequestBody,setRegisterRequestBody] = useState({
        Admin_MailID:"",
        Admin_Password:"",
        First_Name:"",
        Last_Name:"",
        Gender:"female"
    });
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
    
    const handleSubmit = async() => {
        let res = {};
        await axios.post('http://localhost:4000/register', registerRequestBody)
    .then((response) => {
        res = response;
    })
    .catch((error) => {
         res = error;
    });
        if(res.data) {
            setToastMessage({...toastMessage, message: res?.data.message + " Redirecting to Login Page in 2 seconds.... ",type:"success"});
            setTimeout(function() {
                navigate("/login");
              }, 2000);

        }
        else if(!res.data){
            setToastMessage({...toastMessage, message:"Something Went Wrong!",type:"error"});
        }
    }
    return (
        <Grid>
            <Grid className='register-popup'>
                <Grid>
                    <img src={logo} className="register-logo" alt="logo" />
                        <FormControl className="register-form">
                            <Grid className="first-name">
                                <FormLabel className="flabel">First Name </FormLabel>
                                <TextField name = "First_Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <FormLabel className="llabel">Last Name </FormLabel>
                                <TextField name = "Last_Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <FormLabel className="email-label">Email ID<font color="red">*</font> </FormLabel>
                                <TextField name = "Admin_MailID" onChange={(e)=>{onChangeTextField(e)}} type="email" size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <FormLabel className="passwordlabel">Password<font color="red">*</font> </FormLabel>
                                <TextField name = "Admin_Password" onChange={(e)=>{onChangeTextField(e)}} type="password" size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <FormLabel className="confirmlabel">Confirm Password<font color="red">*</font> </FormLabel>
                                <TextField name = "Admin_confirmPassword" onChange={(e)=>{onChangeTextField(e)}} type="password" size="small"></TextField>
                            </Grid>
                            <Grid className="gender-container">
                            <FormLabel className="gender-label">Gender</FormLabel>
                                <RadioGroup 
                                    row
                                    defaultValue="female"
                                    name = "Gender"
                                    onChange={(e)=>{onChangeRadioGroup(e)}}
                                >
                                    <FormControlLabel value="female" control={<Radio color="success"/>} label="Female" />
                                    <FormControlLabel value="male" control={<Radio color="success" />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio color="success" />} label="Other" />
                                </RadioGroup>
                            </Grid>
                            <Button variant="contained" onClick={handleSubmit} color="success">Submit</Button>
                        </FormControl>
                </Grid>
            </Grid>
            {toastMessage?.message.length > 0 && 
                <Alert sx={{ marginTop: '550px',position:"fixed",marginLeft:"385px" , minWidth:'500px'}} severity={toastMessage?.type}>
                    <AlertTitle>{toastMessage?.type}</AlertTitle>
                    <strong>{toastMessage?.message}</strong>
                </Alert>
            }
        </Grid>
    )
}

export default Register;