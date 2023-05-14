import logo from '../logo.jpg'
import {Grid} from '@material-ui/core'
import './Login.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import axios from 'axios'
import { useState } from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    const navigate = useNavigate();
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const [loginRequestBody,setLoginRequestBody] = useState({
        Admin_MailID:"",
        Admin_Password:""
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginRequestBody({...loginRequestBody,[name]:value})
       
    }
    const handleSubmit = async() => {
        let res = {};
        await axios.post('http://localhost:4000/login', loginRequestBody)
        .then((response) => {
            res = response;
        })
        .catch((error) => {
            res = error;
        }); 
        if(res.data.status === 200) {
            setToastMessage({...toastMessage, message: res?.data.message + " Redirecting to Home Page in 2 seconds.... ",type:"success"});
            setTimeout(function() {
                navigate("/home");
                }, 2000);

        }
        else{
            setToastMessage({...toastMessage, message:"Invalid Email Address Or Password, Try Again!",type:"error"});
        }
    }
    return (
        <Grid>
            <Grid className='login-popup'>
                <Grid>
                    <img src={logo} className="register-logo" alt="logo" />
                        <FormControl className="register-form">
                            <Grid className="first-name">
                                <FormLabel className="flabel">Email ID<font color="red">*</font> </FormLabel>
                                <TextField type="email" name = "Admin_MailID" onChange={(e)=>{onChangeTextField(e)}} required  size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <FormLabel className="llabel">Password<font color="red">*</font> </FormLabel>
                                <TextField type="password" name = "Admin_Password" onChange={(e)=>{onChangeTextField(e)}} required size="small"></TextField>
                            </Grid>
                            <Grid className="buttonlabel">
                                <Button variant="text" className='button' onClick={()=>{navigate("/register")}} >New User! Register</Button>
                                <Button variant="contained" onClick={handleSubmit} color="success" >Login</Button>
                            </Grid>
                        </FormControl>
                </Grid>
            </Grid>
            {toastMessage?.message.length > 0 && 
                <Alert sx={{ marginTop: '400px',position:"fixed",marginLeft:"385px" , minWidth:'500px'}} severity={toastMessage?.type}>
                    <AlertTitle>{toastMessage?.type}</AlertTitle>
                    <strong>{toastMessage?.message}</strong>
                </Alert>
            }
        </Grid>
    )
}

export default Login;