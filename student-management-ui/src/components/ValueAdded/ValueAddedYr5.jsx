import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ValueAddedYr5 = () =>{
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [registerRequestBody,setRegisterRequestBody] = useState({
        Name_Of_ValueAddedCourses_Offered:"",
        Course_Code:"",
        Yr_Of_Offering:"",
        Num_Of_times_Offered_DuringSameYr:"",
        Duration_Of_Course:"",
        Num_Of_Students_Enrolled_In_Yr:"",
        Num_Of_Students_Completed:""
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const handleSubmit = () => {
        axios.post('http://localhost:4000/valueaddedYr5', registerRequestBody)
    }
    console.log('request body:',registerRequestBody)
    return (
        <Grid>
            <Grid className='demand-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="activities-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                    <FormControl className="register-form">
                            <Grid className="first-grid">
                                <TextField name = "Name_Of_ValueAddedCourses_Offered" label="Name Of Value Added Course" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Course_Code" type="Number" InputProps={{ sx: { width: 250 } }} label="Course Code" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Year Of Offering"
                                        value={dateOfBirth}
                                        views={['year']}
                                        name="small"
                                        onChange={(newValue)=>{
                                        setDateOfBirth(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        setRegisterRequestBody({...registerRequestBody,Yr_Of_Offering:year});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Num_Of_times_Offered_DuringSameYr" type="Number" label="Number Of times Offered" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Duration_Of_Course" label="Duration" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Num_Of_Students_Enrolled_In_Yr" type="Number" label="Number Of Students Enrolled" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Num_Of_Students_Completed" type="Number" label="Number Of Students Completed" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="small"></TextField>
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

export default ValueAddedYr5;