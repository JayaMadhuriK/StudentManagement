import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import './Mtech.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const StudentSatisfactory = () =>{
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [registerRequestBody,setRegisterRequestBody] = useState({
        Name_of_Student:"",
        Gender:"",
        Category:"",
        State_of_domicille:"",
        Nationality_if_other_than_india:"",
        Email_ID:"",
        Program_Name:"",
        Student_Unique_Enrollment:"",
        mobile_number:"",
        Year_of_joining:""

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
    const handleSubmit = () => {
        axios.post('http://localhost:4000/studentsatisfactory', registerRequestBody)
    }
    console.log('request body:',registerRequestBody)
    return (
        <Grid>
            <Grid className='student-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="activities-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                    <FormControl className="pass-form">
                            <Grid className="first-grid">
                                <TextField name = "Name_of_Student" label="Name of Student" InputProps={{ sx: { width: 250 } }}onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Category" label="Category" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "State_of_domicille" label="State" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }}size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Nationality_if_other_than_india" label="Nationality(other than India)" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}}  size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Email_ID" type="email" label="Email ID" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }}  size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Program_Name" label="Program Name" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }}  size="smamediumll"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Student_Unique_Enrollment" type="Number" label="University RollNumber" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}}  size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "mobile_number" type="Number" label="Mobile Number" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}}  size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Year Of Joining"
                                        value={dateOfBirth}
                                        views={['year']}
                                        name="small"
                                        onChange={(newValue)=>{
                                        setDateOfBirth(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        setRegisterRequestBody({...registerRequestBody,Year_of_joining:year});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <FormLabel className="gender-label">Gender</FormLabel>
                                    <RadioGroup 
                                        className="radio-group"
                                        row
                                        defaultValue="male"
                                        name = "Gender"
                                        onChange={(e)=>{onChangeRadioGroup(e)}}
                                    >
                                    <FormControlLabel value="male" control={<Radio color="success"/>} label="Male" />
                                    <FormControlLabel value="female" control={<Radio color="success" />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio color="success" />} label="Other" />
                                </RadioGroup>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" className="button1" onClick={handleSubmit} color="success">Submit</Button>
                            </Grid>
                    </FormControl>
                   
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StudentSatisfactory;