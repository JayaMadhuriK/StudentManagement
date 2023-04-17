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

const HigherEdu = () =>{
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [registerRequestBody,setRegisterRequestBody] = useState({
        NameOfTeacher:"",
        NumberOf_Students_Enrolled:"",
        Name_Of_Students:"",
        Program_Graduated_From:"",
        Name_Of_Institution_joined:"",
        Name_Of_Programme_Admitted_To:"",
        IdentityCardORAdmissionLetter:""
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const handleSubmit = () => {
        axios.post('http://localhost:4000/highereducation', registerRequestBody)
    }
    console.log('request body:',registerRequestBody)
    return (
        <Grid>
            <Grid className='activity-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="activities-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                    <FormControl className="register-form">
                            <Grid className="first-grid">
                                <TextField name = "NameOfTeacher" label="Name Of Teacher" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "NumberOf_Students_Enrolled" type="Number" InputProps={{ sx: { width: 250 } }} label="Number Of Students Enrolled" onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_Of_Students" label="Name Of Students" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Program Graduated From"
                                        value={dateOfBirth}
                                        views={['year']}
                                        name="small"
                                        onChange={(newValue)=>{
                                        setDateOfBirth(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        setRegisterRequestBody({...registerRequestBody,Program_Graduated_From:year});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_Of_Institution_joined" label="Name Of Institution joined" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_Of_Programme_Admitted_To" label="Name Of Programme Admitted To" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" color="success" className="first-name" size="small" ><input type="file" name="IdentityCardORAdmissionLetter" onChange={(e)=>{onChangeTextField(e)}}/></Button>
                                <Button variant="contained" className="button" onClick={handleSubmit} color="success">Submit</Button>
                            </Grid>
                    </FormControl>
                   
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HigherEdu;