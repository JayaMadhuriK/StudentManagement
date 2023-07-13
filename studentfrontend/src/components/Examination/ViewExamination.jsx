import {TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../View.scss'
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewExamination = () =>{
    const navigate = useNavigate();
    const access = localStorage.getItem("user_access");
    const [studentData,setStudentData] = useState([]);
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/exam')
        setStudentData(response?.data);
        console.log(response);
    }
    useEffect(() => {
        getStudentData();
      },[]);
    const handleDownload = async() =>{
        await axios.post('http://localhost:4000/download/download20');
        window.alert("downloaded");
    }
    return(
        <>
        {access == "ADMIN_ACCESS" ? (
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>Average Number of Students Qualifying in Examination</h1>
                <Button variant="contained" color="success" size="large" onClick={()=>{navigate('/home')}} className="btn"><ArrowBackIcon/></Button>

                <Button variant="contained" color="primary" size="large" onClick={()=>{navigate("/exam")}} className="buttonnew"><AddIcon/>Add Record</Button>

                <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
            </Grid>
            <TableContainer component={Paper} className="app-container">
                <Table aria-label='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Year</TableCell>
                            <TableCell>Registeration_Number</TableCell>
                            <TableCell>NET</TableCell>
                            <TableCell>SLET</TableCell>
                            <TableCell>GATE</TableCell>
                            <TableCell>GMAT</TableCell>
                            <TableCell>CAT</TableCell>
                            <TableCell>GRE</TableCell>
                            <TableCell>JAM</TableCell>
                            <TableCell>IELET</TableCell>
                            <TableCell>TOEFL</TableCell>
                            <TableCell>Civil_Services</TableCell>
                            <TableCell>State_government</TableCell>
                            <TableCell>Other_examinations</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow 
                                key = {student.Registeration_Number}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.year}</TableCell>
                                <TableCell>{student.Registeration_Number}</TableCell>
                                <TableCell>{student.NET}</TableCell>
                                <TableCell>{student.SLET}</TableCell>
                                <TableCell>{student.GATE}</TableCell>
                                <TableCell>{student.GMAT}</TableCell>
                                <TableCell>{student.CAT}</TableCell>
                                <TableCell>{student.GRE}</TableCell>
                                <TableCell>{student.JAM}</TableCell>
                                <TableCell>{student.IELET}</TableCell>
                                <TableCell>{student.TOEFL}</TableCell>
                                <TableCell>{student.Civil_Services}</TableCell>
                                <TableCell>{student.State_government}</TableCell>
                                <TableCell>{student.Other_examinations}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/exam",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/exam/${student.Registeration_Number}`);
                                            window.location.reload(false);
                                        }} 
                                        color="error" size="small">Delete</Button>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>):(
            <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    )
}

export default ViewExamination;