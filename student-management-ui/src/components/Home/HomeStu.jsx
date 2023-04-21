import logo from '../../resources/logo.jpg'
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
        <Grid className="home">
            <Grid className="home-grid1">
                <FormControl>
                    <img src={logo} className="register-logo" alt="logo" />
                    <FormLabel className="home-label">
                        Home Page
                    </FormLabel>
                    <FormLabel className="home-label1">
                        Welcome 
                    </FormLabel>
                    <Button variant="contained" className="button" onClick={()=>{navigate("/login")}} color="success" >Admin Login</Button>

                </FormControl>
            </Grid>
            <Grid className="body">
                <Button variant="contained" color="success" className="btech" onClick={handleBtech}>BTECH</Button>
                <Button variant="contained" color="success" className="mtech" onClick={handleMtech}>MTECH</Button>
                <Button variant="contained" color="success" className="mscormca" onClick={handleMscORMca}>MSC Or MCA</Button>
            </Grid>
        </Grid>
        
    )
   
}

export default HomeStu;