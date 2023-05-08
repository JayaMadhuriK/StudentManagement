import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'; 
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AvgPassPercentage = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const student= location?.state?.student ||{
        Program_Name:"",
        Program_Code:"",
        NumOfStudents_appeared_in_finalYr_examination:"",
        NumOfStudents_Passed_in_finalYr_examination:""
    };
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const editData = location?.state?.student ? true : false;
    const [registerRequestBody,setRegisterRequestBody] = useState(student);
    const handleSubmit = async() => {
        let res = {};
        if(editData){
            await axios.put(`http://localhost:4000/avgpasspercentage/${student.Program_Code}`, registerRequestBody)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewpass")
                }, 2000);
            }
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
            }
        }else{
            await axios.post('http://localhost:4000/avgpasspercentage', registerRequestBody)
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
    }
    return (
        <Grid>
            <Grid className="stu">
            <Button variant="contained" color="primary" size="large" onClick={()=>{navigate(-1)}} className="buttonnew"><ArrowBackIcon/>BACK</Button>
            </Grid>
            <Grid className='activities-popup'>
                <Grid>
                    <Grid className="logo">
                        <img src={logo} className="activities-logo" alt="logo" />
                        <FormLabel className="andhra-university">Andhra University College Of Engineering</FormLabel>
                    </Grid>
                    <FormControl className="pass-form">
                            <Grid className="first-grid">
                                <TextField name = "Program_Name" value={registerRequestBody?.Program_Name} label="Program Name" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Program_Code" value={registerRequestBody?.Program_Code} type="Number" label="Program Code" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "NumOfStudents_appeared_in_finalYr_examination" value={registerRequestBody?.NumOfStudents_appeared_in_finalYr_examination} type="Number" label="No Of Students appeared finalYr examination" onChange={(e)=>{onChangeTextField(e)}} size="small"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "NumOfStudents_Passed_in_finalYr_examination" value={registerRequestBody?.NumOfStudents_Passed_in_finalYr_examination} type="Number" label="No Of Students Passed in finalYr examination" onChange={(e)=>{onChangeTextField(e)}}  size="small"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" className="button1" onClick={handleSubmit} color="success">Submit</Button>
                            </Grid>
                    </FormControl>
                   
                </Grid>
                    {toastMessage?.message.length > 0 && 
                        <Alert sx={{ marginTop: '-150px',position:"fixed",marginRight:"300px" , minWidth:'500px'}} severity={toastMessage?.type}>
                            <AlertTitle>{toastMessage?.type}</AlertTitle>
                            <strong>{toastMessage?.message}</strong>
                        </Alert>
                    }
            </Grid>
        </Grid>
    )
}

export default AvgPassPercentage;