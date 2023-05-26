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
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';


const Login = () =>{
    const navigate = useNavigate();
    const [loginRequestBody,setLoginRequestBody] = useState({
        Admin_MailID:"",
        Admin_Password:""
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [isDisable, setIsDisable] = useState(true);
    const [isDialogOpen,setIsDialogOpen] = useState(false);

    const [formValues, setFormValues] = useState(loginRequestBody);
    const [formErrors, setFormErrors] = useState({});
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === "Admin_MailID"){
            if(!value){
                setFormErrors({...formErrors,Admin_MailID:'Email Required'});
            }
            else{
                setFormErrors({...formErrors,Admin_MailID:''});
                setFormValues({...formValues,Admin_MailID:value})
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
       
    };
    const handleClose = () =>{
        setIsDialogOpen(false);
    };
    const handleSubmit = async() => {
        let res = {};
        await axios.post('http://localhost:4000/login', loginRequestBody)
        .then((response) => {
            res = response;
        })
        .catch((error) => {
            res = error;
        }); 
        console.log(res)
        if(res?.data.status === 200) {
            setToastMessage({...toastMessage, message: res?.data.message + " Redirecting to Home Page in 2 seconds.... ",type:"success"});
            setTimeout(function() {
                navigate("/home");
                }, 2000);

        }
        else{
            setToastMessage({...toastMessage, message:"Invalid Email Address Or Password, Try Again!",type:"error"});
            setTimeout(function() {
                window.location.reload(false);
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
        if (formErrors?.Admin_MailID?.length == 0 && formErrors?.Admin_Password?.length == 0 ) {
            setIsDisable(false);
        }
        else if(formErrors?.Admin_MailID?.length != 0 || formErrors?.Admin_Password?.length != 0){
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
                                <TextField type="email" name = "Admin_MailID" onChange={(e)=>{onChangeTextField(e)}} style={{backgroundColor:"white",width:"225px"}} InputProps={input} required  size="small"></TextField>
                                <p style={{color:"red", position:"absolute",marginTop:"45px",marginLeft:"100px"}}>{formErrors.Admin_MailID}</p>

                            </Grid>
                            <Grid className="first-name">
                                <FormLabel className="llabel">Password</FormLabel>
                                <TextField type={showPassword ? "text" : "password"} name = "Admin_Password" onChange={(e)=>{onChangeTextField(e)}} style={{backgroundColor:"white",width:"225px"}} InputProps={inputpass} required size="small"></TextField>
                                <p style={{color:"red", position:"absolute",marginTop:"45px",marginLeft:"100px"}}>{formErrors.Admin_Password}</p>

                            </Grid>
                            <Grid className="buttonlabel">
                                <Button variant="standard" className='button' onClick={()=>{setIsDialogOpen(true)}} >New User! Register</Button>
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
            <Dialog sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "400px", 
                        marginLeft:"80px"
                        },
                    },
                }} onClose={handleClose} open={isDialogOpen} >
                <DialogActions>
                    <Button variant="contained" className="button"  onClick={()=>{navigate('/adminregister')}}>Register as Admin</Button>
                    <Button variant="contained" className="button" onClick={()=>{navigate('/studentregister')}}>Register as Student</Button>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </DialogActions>
            </Dialog>
            </Grid>
        </Grid>
    )
}

export default Login;