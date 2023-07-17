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

const StudentComputer = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const [file,setFile] = useState(location?.state?.student ? null : null);
    const [file1,setFile1] = useState(location?.state?.student ? null : null);
    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }
    const handleFile1=(e)=>{
        setFile1(e.target.files[0]);
    }
    const access = localStorage.getItem("user_access");
    const student= location?.state?.student || {
        Id:"",
        Name_Of_Department:"",
        Total_number_of_students:"",
        Number_of_computers_available_to_use:"",
        Bills_Purchase_documents:"",
        Proof_of_stock_register_entry:"",
        Student_Computer_Ratio:"",
    };
    const editData = location?.state?.student ? true : false;
    const [registerRequestBody,setRegisterRequestBody] = useState(student);
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const handleSubmit = async() => {
        const formdata = new FormData();
        formdata.append('Id',registerRequestBody.Id)
        formdata.append('Name_Of_Department',registerRequestBody.Name_Of_Department)
        formdata.append('Total_number_of_students',registerRequestBody.Total_number_of_students)
        formdata.append('Number_of_computers_available_to_use',registerRequestBody.Number_of_computers_available_to_use)
        formdata.append('image',file)
        formdata.append('image1',file1);
        formdata.append('Student_Computer_Ratio',registerRequestBody.Student_Computer_Ratio)

        let res = {};
        if(editData){
            await axios.put(`http://localhost:4000/computerratio/${student.Id}`, formdata)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.statusText == "OK") {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewcomputers")
                }, 2000);
            }
            else{
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
                setTimeout(function() {
                    window.location.reload(false);
                }, 2000);
            }
        }else{
            await axios.post('http://localhost:4000/computerratio', formdata)
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
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Duplicate Entry...",type:"error"});
                setTimeout(function() {
                    window.location.reload(false);
                }, 2000);
            }
        }
    }
    return (
        <>
        {access == "ADMIN_ACCESS" ? (
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
                    <FormControl className="register-form">
                            <Grid className="first-grid">
                                <TextField name = "Name_Of_Department" label="Name Of Department" value={registerRequestBody?.Name_Of_Department} InputProps={{ sx: { width: 250 } }}onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Total_number_of_students" label="Total number of students" value={registerRequestBody?.Total_number_of_students} InputProps={{ sx: { width: 250 } }}onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Number_of_computers_available_to_use" label="Number Of Computer Available" value={registerRequestBody?.Number_of_computers_available_to_use} InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Student_Computer_Ratio" label="Student Computer Ratio" value={registerRequestBody?.Student_Computer_Ratio} InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Button className="first-name" size="small" ><font color="black">Bill Purchases:</font><input type="file" name="image" onChange={handleFile}/></Button>
                            <Button className="first-name" size="small" ><font color="black">Stock Register:</font><input type="file" name="image1" onChange={handleFile1}/></Button>
                            <Grid className="button-grid">
                                <Button variant="contained" className="button1" onClick={handleSubmit}>Submit</Button>
                            </Grid>
                    </FormControl>
                </Grid>
                    {toastMessage?.message.length > 0 && 
                        <Alert sx={{ marginTop: '-350px',position:"fixed", marginLeft:'500px',minWidth:'400px'}} severity={toastMessage?.type}>
                            <AlertTitle>{toastMessage?.type}</AlertTitle>
                            <strong>{toastMessage?.message}</strong>
                        </Alert>
                    }
            </Grid>
        </Grid>
         ):(
            <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    )
}

export default StudentComputer;