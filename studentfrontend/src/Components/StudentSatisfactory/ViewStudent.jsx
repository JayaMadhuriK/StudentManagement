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

const ViewStudent = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/studentsatisfactory')
        setStudentData(response?.data);
        console.log(response);
    }
    useEffect(() => {
        getStudentData();
      },[]);
    const handleDownload = async() =>{
        await axios.post('http://localhost:4000/download/download1');
        window.alert("downloaded");
    }
    return(
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>Student Satisfactory</h1>
                <Button variant="contained" color="success" size="large" onClick={()=>{navigate('/home')}} style={{marginTop:'0px',marginLeft:'-600px',position:'absolute',backgroundColor:'rgb(8, 15, 105)'}}><ArrowBackIcon/></Button>
                <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
            </Grid>
            <TableContainer component={Paper} className="app-container">
                <Table aria-label='table'>
                    <TableHead> 
                        <TableRow>
                            <TableCell align="center">Name of Student</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">State of domicille</TableCell>
                            <TableCell align="center">Nationality(if other than India)</TableCell>
                            <TableCell align="center">Email ID</TableCell>
                            <TableCell align="center">Program Name</TableCell>
                            <TableCell align="center">Student Unique Enrollment</TableCell>
                            <TableCell align="center">mobile number</TableCell>
                            <TableCell align="center">Year of joining</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow 
                                key = {student.Student_Unique_Enrollment}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.Name_of_Student}</TableCell>
                                <TableCell>{student.Gender}</TableCell>
                                <TableCell>{student.Category}</TableCell>
                                <TableCell>{student.State_of_domicille}</TableCell>
                                <TableCell>{student.Nationality_if_other_than_india}</TableCell>
                                <TableCell align="center">{student.Email_ID}</TableCell>
                                <TableCell>{student.Program_Name}</TableCell>
                                <TableCell>{student.Student_Unique_Enrollment}</TableCell>
                                <TableCell>{student.mobile_number}</TableCell>
                                <TableCell>{student.Year_of_joining}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/studentsatisfactory",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/studentsatisfactory/${student.Student_Unique_Enrollment}`);
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
        </Grid>
    )
}

export default ViewStudent;