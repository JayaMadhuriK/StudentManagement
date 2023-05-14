import logo from '../logo.jpg'
import {Grid} from '@material-ui/core'
import './Home.scss'
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';


const HomeStu = () =>{
    const navigate = useNavigate();
    const handleBtech = () =>{
        navigate("/btech");
    }
    const handleMtech = () =>{
        navigate("/mtech");
    }
    const handleMscORMca= () =>{
        navigate("/mscormca");
    }
    return(
            <Grid className="home-grid1">
                <img src={logo} className="register-logo" alt="logo" />
                <FormLabel className="au">AU</FormLabel>
                <Button variant="standard" className="button" onClick={()=>{navigate("/login")}} color="success" >Admin Login</Button>
                <Button variant="standard" color="success" className="home-btn" onClick={()=>{navigate('/')}}>HOME</Button>
                <Button variant="standard" color="success" className="btech" onClick={handleBtech}>BTECH</Button>
                <Button variant="standard" color="success" className="mtech" onClick={handleMtech}>MTECH</Button>
                <Button variant="standard" color="success" className="mscormca" onClick={handleMscORMca}>MSC / MCA</Button>
            </Grid>
    )
}

export default HomeStu;