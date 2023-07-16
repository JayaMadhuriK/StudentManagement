import logo from '../logo.jpg'
import Grid from '@material-ui/core/Grid'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'; 
import { useNavigate } from 'react-router-dom'; 
import {useLocation} from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PerStudentUndertaking = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const access = localStorage.getItem("user_access");
    const [file,setFile] = useState();
    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }
    const student= location?.state?.student ||{
        Id:"",
        Program_name:"",
        Program_code:"",
        list_of_students_undertakig_field_projects_researchs_internships:"",
        link_to_relevant_documents:""
    };
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const editData = location?.state?.student ? true : false;
    const [registerRequestBody,setRegisterRequestBody] = useState(student);
    const handleSubmit = async() => {
        const formdata = new FormData();
        formdata.append('Program_name',registerRequestBody.Program_name)
        formdata.append('Program_code',registerRequestBody.Program_code)
        formdata.append('list_of_students_undertakig_field_projects_researchs_internships',registerRequestBody.list_of_students_undertakig_field_projects_researchs_internships)
        formdata.append('image',file);
        let res = {};
        if(editData){
            await axios.put(`http://localhost:4000/internships/${student.Program_code}`, registerRequestBody)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewinternships")
                }, 2000);
            }
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
                setTimeout(function() {
                    window.location.reload(false);
                }, 2000);
            }
        }else{
            await axios.post('http://localhost:4000/internships', formdata)
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
                setTimeout(function() {
                    window.location.reload(false);
                }, 2000);
            }
        }
    }
    return (
        <>
        {access == "ADMIN_ACCESS" ? (<Grid>
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
                                <TextField name = "Program_name" value={registerRequestBody?.Program_name} label="Program Name" onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Program_code" value={registerRequestBody?.Program_code} type="Number" label="Program Code" onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "list_of_students_undertakig_field_projects_researchs_internships" value={registerRequestBody?.list_of_students_undertakig_field_projects_researchs_internships} type="Number" label="list of students undertakig field/projects/researchs/internships" onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                            <Button variant="contained" className="first-name" size="small" ><input type="file" name="image" onChange={handleFile}/></Button>
                            <Button variant="contained" className="button1" onClick={handleSubmit}>Submit</Button>
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
        </Grid> ):(
            <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    )
}

export default PerStudentUndertaking;