import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import './Register.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Placements = () =>{
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [dateOfSec,setDateOfSec] = useState(null)
    const [registerRequestBody,setRegisterRequestBody] = useState({
        Year:"",
        Name_of_the_Teacher:"",
        NumberOfStudentsGuided:"",
        Contact_Details:"",
        Program_graduated_from:"",
        Name_of_company:"",
        Name_of_employer_with_contact_details:"",
        Pay_package_at_appointment:"",
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const handleSubmit = () => {
        axios.post('http://localhost:4000/placement', registerRequestBody)
    }
    console.log('request body:',registerRequestBody)
    return (
        <Grid>
            <Grid className='placement-popup'>
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
                                <TextField name = "Name_of_the_Teacher" label="Name of the Teacher" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "NumberOfStudentsGuided" type="Number" label="Number Of Students Guided" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Contact_Details" label="Contact Details" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}}  size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Program Graduated From"
                                        value={dateOfSec}
                                        views={['year']}
                                        name="small"
                                        onChange={(newValue)=>{
                                        setDateOfSec(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        setRegisterRequestBody({...registerRequestBody,Program_graduated_from:year});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_of_company" label="Name Of company" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_of_employer_with_contact_details" label="Name Of Employer With Contact Details" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Pay_package_at_appointment" label="Pay package at appointment" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" className="button" onClick={handleSubmit} color="success">Submit</Button>
                            </Grid>
                    </FormControl>
                   
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Placements;