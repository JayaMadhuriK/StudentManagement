import logo from '../logo.jpg'
import {Grid} from '@material-ui/core'
import './Login.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import axios from 'axios'
import { useState,useEffect } from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () =>{
    const navigate = useNavigate();
    const [loginRequestBody,setLoginRequestBody] = useState({
        Admin_EmailID:"",
        Admin_Password:""
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [isDisable, setIsDisable] = useState(true);
    const [formValues, setFormValues] = useState(loginRequestBody);
    const [formErrors, setFormErrors] = useState({});
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === "Admin_EmailID"){
            if(!value){
                setFormErrors({...formErrors,Admin_EmailID:'Email Required'});
            }
            else{
                setFormErrors({...formErrors,Admin_EmailID:''});
                setFormValues({...formValues,Admin_EmailID:value})
            }
        }
        else if(name === "Admin_Password"){
            if(!value){
                setFormErrors({...formErrors,Admin_Password:'Password Required'});
            }
            else{
                setFormErrors({...formErrors,Admin_Password:''});
                setFormValues({...formValues,Admin_Password:value})
            }
        }
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
        if(res?.status == 200) {
            console.log(res)
            if(res?.data[0]?.UserType == "admin"){
                setToastMessage({...toastMessage, message:" Redirecting to Home Page in 2 seconds.... ",type:"success"});
                setTimeout(function() {
                    navigate("/home");
                    }, 2000);
            }
            else if(res?.data[0]?.UserType == "student") {
                setToastMessage({...toastMessage, message:" Redirecting to Home Page in 2 seconds.... ",type:"success"});
                setTimeout(function() {
                    navigate("/studenthome")
                }, 2000);
            }
        }
        else if(res?.status == 400 || res?.status == 404){
            console.log(res)
            setToastMessage({...toastMessage, message:"Invalid Email Address Or Password, Try Again!",type:"error"});
            setTimeout(function() {
                setToastMessage({...toastMessage, message:""});
            }, 2000);
        }
        else{
            console.log(res)
            setToastMessage({...toastMessage, message:"NetWork Error, Try Again!",type:"error"});
            setTimeout(function() {
                setToastMessage({...toastMessage, message:""});
            }, 2000);
        }
    }
    const inputpass = {
        disableUnderline: true,
        style: {
            color: "black",
            disableUnderline: true,
        },
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                >
                {showPassword ? <VisibilityIcon sx={{ color: "blue"}}/> : <VisibilityOffIcon sx={{ color: "blue"}}/>}
                </IconButton>
            </InputAdornment>
          ),
    };
    const input = {
        disableUnderline: true,
        style: {
            color: "black",
            disableUnderline: true,
        },
        endAdornment: (
            <InputAdornment position="end">
              <EmailIcon sx={{ color: "blue"}}/>
            </InputAdornment>
          ),
    };
    useEffect(() => {
        if (formErrors?.Admin_EmailID?.length == 0 && formErrors?.Admin_Password?.length == 0 ) {
            setIsDisable(false);
        }
        else if(formErrors?.Admin_EmailID?.length != 0 || formErrors?.Admin_Password?.length != 0){
            setIsDisable(true);
        }
    }, [formErrors]);
    return (
        <Grid>
            <Grid className="all">
            <Grid className='login-popup'>
                <Grid>
                    <img src={logo} className="register-logo" alt="logo" />
                        <FormControl className="register-form">
                            <Grid className="first-name">
                                <FormLabel className="flabel">Email ID</FormLabel>
                                <TextField type="email" name = "Admin_EmailID" onChange={(e)=>{onChangeTextField(e)}} style={{backgroundColor:"white",width:"225px"}} InputProps={input} required  size="small"></TextField>
                                <p style={{color:"red", position:"absolute",marginTop:"45px",marginLeft:"100px"}}>{formErrors.Admin_EmailID}</p>

                            </Grid>
                            <Grid className="first-name">
                                <FormLabel className="llabel">Password</FormLabel>
                                <TextField type={showPassword ? "text" : "password"} name = "Admin_Password" onChange={(e)=>{onChangeTextField(e)}} style={{backgroundColor:"white",width:"225px"}} InputProps={inputpass} required size="small"></TextField>
                                <p style={{color:"red", position:"absolute",marginTop:"45px",marginLeft:"100px"}}>{formErrors.Admin_Password}</p>

                            </Grid>
                            <Grid className="buttonlabel">
                                <Button variant="standard" className='button' onClick={()=>{navigate("/register")}} >New User! Register</Button>
                                <Button variant="contained" onClick={handleSubmit} disabled={isDisable} style={{backgroundColor:"white",color:"black"}}>Login</Button>
                            </Grid>
                        </FormControl>
                </Grid>
            </Grid>
            {toastMessage?.message.length > 0 && 
                <Alert sx={{ marginTop: '450px',position:"fixed",marginLeft:"385px" , minWidth:'500px'}} severity={toastMessage?.type}>
                    <AlertTitle>{toastMessage?.type}</AlertTitle>
                    <strong>{toastMessage?.message}</strong>
                </Alert>
            }
            </Grid>
        </Grid>
    )
}
export default Login;