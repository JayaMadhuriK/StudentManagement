import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'; 

const CouncilActivity = () =>{
    const [dateOfBirth,setDateOfBirth] = useState(null);
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const [registerRequestBody,setRegisterRequestBody] = useState({
        StudentCouncil_Name:"",
        Date_Of_Establishment:"",
        Activities:"",
        ProofsOREvidencesOrWebLinks:""
    });
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
     const handleSubmit = async() => {
        let res = {};
        await axios.post('http://localhost:4000/councilactivities', registerRequestBody)
        .then((response) => {
            res = response;
        })
        .catch((error) => {
            res = error;
        });
        if(res.data) {
            setToastMessage({...toastMessage, message: "Data Successfully Submitted" ,type:"success"});
            setTimeout(function() {
                window.location.reload(false);
              }, 2000);

        }
        else{
            setToastMessage({...toastMessage, message:"Duplicate Entry...",type:"error"});
        }
    }
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
                                <TextField name = "StudentCouncil_Name" label="Student Council Name" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="large"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                            <DatePicker 
                                                label="Date Of Birth"
                                                value={dateOfBirth}
                                                onChange={(newValue)=>{
                                                setDateOfBirth(newValue);
                                                const date = new Date(newValue);
                                                const year =String(date.getFullYear())
                                                const month =Number(String(date.getMonth()).padStart(0,2))+1;
                                                const day =String(date.getDate()).padStart(0,2);
                                                const dob = year+"-"+month+"-"+day;
                                                setRegisterRequestBody({...registerRequestBody,Date_Of_Establishment:dob});
                                                }}
                                                renderInput={(props)=>{ <TextField {...props}/> }}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                            <Grid className="first-name">
                                <TextField name = "Activities" label="Activities" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="large"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                            <Button variant="contained" color="success" className="first-name" size="small" ><input type="file" name="ProofsOREvidencesOrWebLinks" onChange={(e)=>{onChangeTextField(e)}}/></Button>
                            <Button variant="contained" className="button1" size="medium" onClick={handleSubmit} color="success">Submit</Button>
                            </Grid>
                    </FormControl>
                </Grid>
                    {toastMessage?.message.length > 0 && 
                        <Alert sx={{ marginTop: '-250px',position:"fixed",marginRight:"300px" , minWidth:'500px'}} severity={toastMessage?.type}>
                            <AlertTitle>{toastMessage?.type}</AlertTitle>
                            <strong>{toastMessage?.message}</strong>
                        </Alert>
                    }
            </Grid>
        </Grid>
    )
}

export default CouncilActivity;
