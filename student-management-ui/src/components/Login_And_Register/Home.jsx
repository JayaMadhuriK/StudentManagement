import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import './Register.scss'
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';

const Home = () =>{
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
                </FormControl>
            </Grid>
        </Grid>
    )
   
}

export default Home;