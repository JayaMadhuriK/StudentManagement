import logo from '../logo.jpg'
import Grid from '@material-ui/core/Grid'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'; 
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom'; 
import {useLocation} from 'react-router-dom'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Education = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [dateOfYear,setDateOfYear] = useState(null)
    const student= location?.state?.student ||({
        year:"",
        Registeration_Number:"",
        NET:"",
        SLET:"",
        GATE:"",
        GMAT:"",
        CAT:"",
        GRE:"",
        JAM:"",
        IELET:"",
        TOEFL:"",
        Civil_Services:"",
        State_government:"",
        Other_examinations:"",
    });
    const [registerRequestBody,setRegisterRequestBody] = useState(student);
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const student_Name = localStorage.getItem("student");
    const access = localStorage.getItem("user_access");
    const onChangeCheckboxGroup = (e) => {
        const {name,value,checked} = e.target;
        setRegisterRequestBody({...registerRequestBody,[name]:checked ? student_Name : ""})
    }
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const editData = location?.state?.student ? true : false;
    const handleSubmit = async() => {
        let res = {};
        if(editData){
            await axios.put(`http://localhost:4000/exam/${student.Registeration_Number}`, registerRequestBody)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewexam")
                }, 2000);
            }
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
                setTimeout(function() {
                    window.location.reload(false);
                }, 2000);
            }
        }else{
        await axios.post('http://localhost:4000/exam', registerRequestBody)
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
    useEffect(()=>{
        if(editData){
            const years = Number(student.year);
            setDateOfYear(dayjs(years+"T18:30:00.000Z"));
        }
    },[]);
    return (
        <>
        {access == "ADMIN_ACCESS" || "STUDENT_ACCESS" ? (
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}> 
                                <DatePicker 
                                    label="Year"
                                    value={dateOfYear}
                                    views={['year']}
                                    name="small"
                                    onChange={(newValue)=>{
                                    setDateOfYear(newValue);
                                    const date = new Date(newValue);
                                    const year =String(date.getFullYear())
                                    setRegisterRequestBody({...registerRequestBody,year:year});
                                    }}
                                    renderInput={(props)=>{ <TextField {...props}/> }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid className="first-name">
                            <TextField name = "Registeration_Number" type="Number" label="Registeration Number" style={{width:"260px"}} value={registerRequestBody?.Registeration_Number} inputProps={{ maxLength: 12 }} onChange={(e)=>{onChangeTextField(e)}} size="medium" required></TextField>
                        </Grid>
                        <FormGroup
                            className='net'
                            style={{marginLeft:"260px", marginTop:"300px",position:"absolute"}}
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel  name = "NET" control={<Checkbox checked = {registerRequestBody?.NET}/>} label="NET" value="NET"/>
                        </FormGroup>
                        <FormGroup
                         style={{marginLeft:"260px", marginTop:"260px",position:"absolute"}}
                           className='second-grid-item'
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel name = "SLET" control={<Checkbox checked = {registerRequestBody?.SLET}/>} label="SLET" value="SLET"/>
                        </FormGroup>
                        <FormGroup
                        style={{marginLeft:"260px", marginTop:"220px",position:"absolute"}}
                         className='third-grid-item'
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel  name = "GATE" control={<Checkbox checked = {registerRequestBody?.GATE}/>} label="GATE" value="GATE"/>
                        </FormGroup>
                        <FormGroup
                         style={{marginLeft:"260px", marginTop:"180px",position:"absolute"}}
                         className='first-grid-item'
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel  name = "GMAT" control={<Checkbox checked = {registerRequestBody?.GMAT} />} label="GMAT" value="GMAT"/>
                        </FormGroup>
                        <FormGroup
                         style={{marginLeft:"260px", marginTop:"140px",position:"absolute"}}
                         className='first-grid-item'
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel name = "CAT" control={<Checkbox checked = {registerRequestBody?.CAT}/>} label="CAT" value="CAT"/>
                        </FormGroup>
                        <FormGroup
                        style={{marginLeft:"260px", marginTop:"100px",position:"absolute"}}
                         className='first-grid-item'
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel  name = "GRE" control={<Checkbox checked = {registerRequestBody?.GRE}/>} label="GRE" value="GRE"/>
                        </FormGroup>
                        <FormGroup
                            style={{marginTop:"5px"}}
                         className='first-grid-item'
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel name = "JAM" control={<Checkbox checked = {registerRequestBody?.JAM}/>} label="JAM" value="JAM"/>
                        </FormGroup>
                        <FormGroup
                         className='first-grid-item'
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel name = "IELET" control={<Checkbox checked = {registerRequestBody?.IELET}/>} label="IELET" value="IELET"/>
                        </FormGroup>
                        <FormGroup
                         className='first-grid-item'
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel name = "TOEFL" control={<Checkbox checked = {registerRequestBody?.TOEFL}/>} label="TOEFL" value="TOEFL"/>
                        </FormGroup>
                        <FormGroup
                         className='first-grid-item'
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel name = "Civil_Services" control={<Checkbox checked = {registerRequestBody?.Civil_Services}/>} label="Civil_Services" value="Civil_Services"/>
                        </FormGroup>
                        <FormGroup
                         className='first-grid-item'
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel  name = "State_government" control={<Checkbox checked = {registerRequestBody?.State_government}/>} label="State_government" value="State_government"/>
                        </FormGroup>
                        <FormGroup
                         className='first-grid-item'
                            onChange={(e)=>{onChangeCheckboxGroup(e)}}
                        >
                        <FormControlLabel name = "Other_examinations" control={<Checkbox checked = {registerRequestBody?.Other_examinations}/>} label="Other_examinations" value="Other_examinations"/>
                        </FormGroup>
                        <Grid className="button-grid">
                            <Button style={{marginTop:"10px"}} variant="contained" className="button1" onClick={handleSubmit}>Submit</Button>
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
        </Grid>):(
           <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    )
}

export default Education;