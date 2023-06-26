import logo from '../logo.jpg'
import {Grid} from '@material-ui/core'
import './Register.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const Register = () =>{
    const navigate = useNavigate();
    const [registerRequestBody,setRegisterRequestBody] = useState({
        Admin_EmailID:"",
        Admin_Password:"",
        First_Name:"",
        Last_Name:"",
        Gender:"female",
        UserType:"admin"
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [formValues, setFormValues] = useState(registerRequestBody);
    const [formErrors, setFormErrors] = useState({});
    const [showPasswordConf, setShowPasswordConf] = useState(false);
    const handleClickShowPasswordConf = () => setShowPasswordConf(!showPasswordConf);
    const handleMouseDownPasswordConf = () => setShowPasswordConf(!showPasswordConf);
    const [password,setPassword]=useState("");
    const [isDisable, setIsDisable] = useState(true);

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
            else if(!/^[A-Z0-9a-z+_-]+@andhrauniversity.edu.in$/.test(value)){
                setFormErrors({...formErrors,Admin_EmailID:'Invalid Email'});
            }
            else{
                setFormErrors({...formErrors,Admin_EmailID:''});
                setFormValues({...formValues,Admin_EmailID:value})
            }
        }
        else if(name === "Admin_Password"){
            setPassword(value);
            var re = {
                capital: /(?=.*[A-Z])/,
                length: /(?=.{7,40}$)/,
                specialChar: /[ -\/:-@\[-\`{-~]/,
                digit: /(?=.*[0-9])/,
            };
            if(!value){
                setFormErrors({...formErrors,Admin_Password:'Password Required'});
            }
            else if((!re.capital.test(value))||(!re.specialChar.test(value))||(!re.length.test(value))||(!re.digit.test(value))){
                setFormErrors({...formErrors,Admin_Password:'Password must contain atleast a Capital, Special character, Number and minimum 8 characters '});
            }
            else{
                setFormErrors({...formErrors,Admin_Password:''});
                setFormValues({...formValues,Admin_Password:value})
            }
        }
            else if(name === "Admin_confirmPassword"){
                if(!value){
                    setFormErrors({...formErrors,Admin_confirmPassword:'Confirm your password'});
                }
                else if(password!=value){

                    setFormErrors({...formErrors,Admin_confirmPassword:'Passwords does not match'});
                }
                else{
                    setFormErrors({...formErrors,Admin_confirmPassword:''});
                }
            }
            else if(name === "First_Name"){
                if(!value){
                    setFormErrors({...formErrors,First_Name:'First Name Required'});
                }
                else{
                    setFormErrors({...formErrors,First_Name:''});
                    setFormValues({...formValues,First_Name:value})
                }
            }
            else if(name === "Last_Name"){
                if(!value){
                    setFormErrors({...formErrors,Last_Name:'Last Name Required'});
                }
                else{
                    setFormErrors({...formErrors,Last_Name:''});
                    setFormValues({...formValues,Last_Name:value})
                }
            }
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const finalValues = {
        Admin_EmailID:registerRequestBody.Admin_EmailID,
        Admin_Password:registerRequestBody.Admin_Password,
        First_Name:registerRequestBody.First_Name,
        Last_Name:registerRequestBody.Last_Name,
        Gender:registerRequestBody.Gender,
        UserType:registerRequestBody.UserType
    };
    const onChangeRadioGroup = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
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
    const inputconf = {
        disableUnderline: true,
        style: {
            color: "black",
            disableUnderline: true,
        },
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPasswordConf}
                onMouseDown={handleMouseDownPasswordConf}
                >
                {showPasswordConf ? <VisibilityIcon sx={{ color: "blue"}}/> : <VisibilityOffIcon sx={{ color: "blue"}}/>}
                </IconButton>
            </InputAdornment>
          ),
    };
    const handleSubmit = async() => {
        let res = {};
        await axios.post('http://localhost:4000/register', finalValues)
        .then((response) => {
            res = response;
        })
        .catch((error) => {
            res = error;
        });
        if(res.data) {
            setToastMessage({...toastMessage, message:" Redirecting to Login Page in 2 seconds.... ",type:"success"});
            setTimeout(function() {
               navigate("/login");
              }, 2000);

        }
        else if(!res.data){
            setToastMessage({...toastMessage, message:"Email ID already exists or Failed",type:"error"});
        }
    }
    useEffect(() => {
        if (formErrors?.First_Name?.length == 0 && formErrors?.Last_Name?.length == 0 && formErrors?.Admin_EmailID?.length == 0 && formErrors?.Admin_Password?.length == 0 && formErrors?.Admin_confirmPassword?.length == 0) {
            setIsDisable(false);
        }
        else if(formErrors?.First_Name?.length != 0 || formErrors?.Last_Name?.length != 0 || formErrors?.Admin_EmailID?.length != 0 || formErrors?.Admin_Password?.length != 0 || formErrors?.Admin_confirmPassword?.length != 0){
            setIsDisable(true);
        }
    }, [formErrors]);
    return (
        <Grid>
            <Grid className="all">
            <Grid className='register-popup'>
                <Grid>
                    <img src={logo} className="register-logo" alt="logo" />
                        <FormControl className="register-form">
                            <Grid className="first-name">
                                <TextField name = "First_Name" variant="filled" InputLabelProps={{style : {color : 'black'} }} style={{backgroundColor:"white"}} label="First Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                <p style={{color:"red", position:"absolute",marginTop:"45px"}}>{formErrors.First_Name}</p>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Last_Name" variant="filled" InputLabelProps={{style : {color : 'black'} }} style={{backgroundColor:"white"}} label="Last Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                                <p style={{color:"red", position:"absolute",marginTop:"45px"}}>{formErrors.Last_Name}</p>

                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Admin_EmailID" variant="filled" InputLabelProps={{style : {color : 'black'} }} style={{backgroundColor:"white"}} label="Email Id" onChange={(e)=>{onChangeTextField(e)}} type="email" size="small"></TextField>
                                <p style={{color:"red", position:"absolute",marginTop:"45px"}}>{formErrors.Admin_EmailID}</p>

                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Admin_Password" variant="filled" InputLabelProps={{style : {color : 'black'} }} style={{backgroundColor:"white",width:"220px"}} InputProps={inputpass} label="Password" onChange={(e)=>{onChangeTextField(e)}} type={showPassword ? "text" : "password"} size="small"></TextField>
                                <p style={{color:"red", position:"absolute",marginTop:"45px"}}>{formErrors.Admin_Password}</p>

                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Admin_confirmPassword" variant="filled" InputLabelProps={{style : {color : 'black'} }} InputProps={inputconf} style={{backgroundColor:"white",width:"220px"}} label="Confirm Password" onChange={(e)=>{onChangeTextField(e)}} type={showPasswordConf ? "text" : "password"} size="small"></TextField>
                                <p style={{color:"red", position:"absolute",marginTop:"45px"}}>{formErrors.Admin_confirmPassword}</p>

                            </Grid>
                            <Grid className="gender-container">
                                <RadioGroup 
                                    row
                                    defaultValue="female"
                                    name = "Gender"
                                    onChange={(e)=>{onChangeRadioGroup(e)}}
                                >
                                    <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female" style={{color:"white"}} />
                                    <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" style={{color:"white"}}/>
                                    <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" style={{color:"white"}}/>
                                </RadioGroup>
                            </Grid>
                            <Button variant="contained" onClick={handleSubmit} disabled={isDisable} style={{color:"black",backgroundColor:"white",marginLeft:"-65px",marginTop:"10px"}}>Submit</Button>
                        </FormControl>
                </Grid>
            </Grid>
                {toastMessage?.message.length > 0 && 
                    <Alert sx={{ marginTop: '500px',position:"fixed",marginLeft:"870px" , minWidth:'500px'}} severity={toastMessage?.type}>
                        <AlertTitle>{toastMessage?.type}</AlertTitle>
                        <strong>{toastMessage?.message}</strong>
                    </Alert>
                }
                </Grid>
        </Grid>
    )
}

export default Register;