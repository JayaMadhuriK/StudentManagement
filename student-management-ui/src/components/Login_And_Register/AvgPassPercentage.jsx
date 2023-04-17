import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import './Mtech.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
const AvgPassPercentage = () =>{
    const [registerRequestBody,setRegisterRequestBody] = useState({
        Program_Name:"",
        Program_Code:"",
        NumOfStudents_appeared_in_finalYr_examination:"",
        NumOfStudents_Passed_in_finalYr_examination:""
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const handleSubmit = () => {
        axios.post('http://localhost:4000/avgpasspercentage', registerRequestBody)
    }
    console.log('request body:',registerRequestBody)
    return (
        <Grid>
            <Grid className='activities-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="activities-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                    <FormControl className="pass-form">
                            <Grid className="first-grid">
                                <TextField name = "Program_Name" label="Program Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Program_Code" type="Number" label="Program Code" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "NumOfStudents_appeared_in_finalYr_examination" type="Number" label="No Of Students appeared finalYr examination" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "NumOfStudents_Passed_in_finalYr_examination" type="Number" label="No Of Students Passed in finalYr examination" onChange={(e)=>{onChangeTextField(e)}}  size="small"></TextField>
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

export default AvgPassPercentage;