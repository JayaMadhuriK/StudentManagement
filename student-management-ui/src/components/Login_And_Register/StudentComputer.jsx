import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import './Mtech.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';


const StudentComputer = () =>{
    const [registerRequestBody,setRegisterRequestBody] = useState({
        Name_Of_Department:"",
        Total_number_of_students:"",
        Number_of_computers_available_to_use:"",
        Bills_Purchase_documents:"",
        Proof_of_stock_register_entry:"",
        Student_Computer_Ratio:"",
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const handleSubmit = () => {
        axios.post('http://localhost:4000/computerratio', registerRequestBody)
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
                    <FormControl className="register-form">
                            <Grid className="first-grid">
                                <TextField name = "Name_Of_Department" label="Name Of Department" InputProps={{ sx: { width: 250 } }}onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Total_number_of_students" label="Total number of students" type="Number" InputProps={{ sx: { width: 250 } }}onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Number_of_computers_available_to_use" type="Number" label="Number Of Computer Available" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Student_Computer_Ratio" label="Student Computer Ratio" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Button className="first-name" size="small" ><font color="black">Bill Purchases:</font><input type="file" name="Bills_Purchase_documents" onChange={(e)=>{onChangeTextField(e)}}/></Button>
                            <Button className="first-name" size="small" ><font color="black">Stock Register:</font><input type="file" name="Proof_of_stock_register_entry" onChange={(e)=>{onChangeTextField(e)}}/></Button>
                            <Grid className="button-grid">
                                <Button variant="contained" className="button1" onClick={handleSubmit} color="success">Submit</Button>
                            </Grid>
                    </FormControl>
                   
                </Grid>
            </Grid>
        </Grid>
    )
}

export default StudentComputer;