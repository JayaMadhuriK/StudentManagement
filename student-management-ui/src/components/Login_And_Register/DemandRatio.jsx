import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import './Mtech.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
const DemandRatio = () =>{
    const [registerRequestBody,setRegisterRequestBody] = useState({
        Program_Name:"",
        Program_Code:"",
        No_Of_Seats_Available:"",
        No_Of_Eligible_ApplicationReceived:"",
        No_Of_Students_Admitted:"",
        Demand_Ratio_OR_Year:"",
        Avg_Of_Last5Years:""
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const handleSubmit = () => {
        axios.post('http://localhost:4000/demandratio', registerRequestBody)
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
                                <TextField name = "Program_Name" label="Program Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Program_Code" type="Number" label="Program Code" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "No_Of_Seats_Available" type="Number" label="Number Of Seats Available" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "No_Of_Eligible_ApplicationReceived" type="Number" label="Number Of Eligible Application Received" onChange={(e)=>{onChangeTextField(e)}}  size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "No_Of_Students_Admitted" type="Number" label="Number Of Students Admitted" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Demand_Ratio_OR_Year" label="Demand Ratio OR Year" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Avg_Of_Last5Years" type="Number" label="Average Of Last5Years" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" className="button" onClick={handleSubmit} size="medium" color="success">Submit</Button>
                            </Grid>
                    </FormControl>
                   
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DemandRatio;