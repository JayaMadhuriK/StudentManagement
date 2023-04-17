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

const Activities = () =>{
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const [registerRequestBody,setRegisterRequestBody] = useState({
        Title_of_collaborative_activity:"",
        Name_of_collaborative_agency_with_contact_details:"",
        Name_of_Participant:"",
        Year_of_collaboration:"",
        Duration:"",
        NatureofActivity:"",
        Link_to_the_relevant_documents:""
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const handleSubmit = () => {
        axios.post('http://localhost:4000/activities', registerRequestBody)
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
                                <TextField name = "Title_of_collaborative_activity" label="Title Of Activity" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_of_collaborative_agency_with_contact_details" InputProps={{ sx: { width: 250 } }} label="Name and Contact Details of Agency" onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_of_Participant" label="Name Of Participant" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                    <DatePicker 
                                        label="Year Of Collaboration"
                                        value={dateOfBirth}
                                        views={['year']}
                                        name="small"
                                        onChange={(newValue)=>{
                                        setDateOfBirth(newValue);
                                        const date = new Date(newValue);
                                        const year =String(date.getFullYear())
                                        setRegisterRequestBody({...registerRequestBody,Year_of_collaboration:year});
                                        }}
                                        renderInput={(props)=>{ <TextField {...props}/> }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Duration" label="Duration(In Days)" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "NatureofActivity" label="Nature Of Activity" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" color="success" className="first-name" size="small" ><input type="file" name="Link_to_the_relevant_documents" onChange={(e)=>{onChangeTextField(e)}}/></Button>
                                <Button variant="contained" className="button" onClick={handleSubmit} color="success">Submit</Button>
                            </Grid>
                    </FormControl>
                   
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Activities;