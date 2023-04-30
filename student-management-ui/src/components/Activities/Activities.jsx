import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import '../Common.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom'; 
import {useLocation} from 'react-router-dom'
import dayjs from 'dayjs';

const Activities = () =>{
    const [dateOfBirth,setDateOfBirth] = useState(null)
    const location = useLocation();
    const navigate = useNavigate();
    const [toastMessage,setToastMessage] = useState({
        type:"",
        message:""
    });
    const student = location?.state?.student ||{
        Title_of_collaborative_activity:"",
        Name_of_collaborative_agency_with_contact_details:"",
        Name_of_Participant:"",
        Year_of_collaboration:"",
        Duration:"",
        NatureofActivity:"",
        Link_to_the_relevant_documents:""
    }
    const editData = location?.state?.student ? true : false;
     const [registerRequestBody,setRegisterRequestBody] = useState(student);
    const onChangeTextField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterRequestBody({...registerRequestBody,[name]:value})
    }
    const handleSubmit = async() => {
        let res = {};
        if(editData){
            await axios.put(`http://localhost:4000/activities/${student.Title_of_collaborative_activity}`, registerRequestBody)
            .then((response) => {
            res = response;
            })
            .catch((error) => {
                res = error;
            });
            if(res.data) {
                setToastMessage({...toastMessage, message: "Data Successfully Updated" ,type:"success"});
                setTimeout(function() {
                    navigate("/viewactivities")
                }, 2000);
            }
            else if(!res.data){
                setToastMessage({...toastMessage, message:"Error! Entry......",type:"error"});
            }
        }else{
            await axios.post('http://localhost:4000/activities', registerRequestBody)
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
            }
        }
    }
    useEffect(()=>{
        if(editData){
            const year = Number(student.Year_of_collaboration) - 1;
            setDateOfBirth(dayjs(year+"-12-31T18:30:00.000Z"));
        }
    },[]);
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
                                <TextField name = "Title_of_collaborative_activity" value={registerRequestBody?.Title_of_collaborative_activity} label="Title Of Activity" InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_of_collaborative_agency_with_contact_details" value={registerRequestBody?.Name_of_collaborative_agency_with_contact_details} InputProps={{ sx: { width: 250 } }} label="Name and Contact Details of Agency" onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "Name_of_Participant" label="Name Of Participant" value={registerRequestBody?.Name_of_Participant} InputProps={{ sx: { width: 250 } }} onChange={(e)=>{onChangeTextField(e)}} size="medium"></TextField>
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
                                <TextField name = "Duration" value={registerRequestBody?.Duration} label="Duration(In Days)" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="first-name">
                                <TextField name = "NatureofActivity" value={registerRequestBody?.NatureofActivity} label="Nature Of Activity" onChange={(e)=>{onChangeTextField(e)}} InputProps={{ sx: { width: 250 } }} size="medium"></TextField>
                            </Grid>
                            <Grid className="button-grid">
                                <Button variant="contained" color="success"  className="first-name" size="small" ><input type="file" value={registerRequestBody?.Link_to_the_relevant_documents} name="Link_to_the_relevant_documents" onChange={(e)=>{onChangeTextField(e)}}/></Button>
                                <Button variant="contained" className="button" onClick={handleSubmit} color="success">Submit</Button>
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

export default Activities;