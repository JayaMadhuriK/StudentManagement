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

const ViewAvg = () =>{
    const navigate = useNavigate();
    const access = localStorage.getItem("user_access");
    const [studentData,setStudentData] = useState([]);
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/avgnumberofdays')
        setStudentData(response?.data);
        console.log(response);
    }
    useEffect(() => {
        getStudentData();
      },[]);
    const handleDownload = async() =>{
        await axios.post('http://localhost:4000/download/download3');
        window.alert("downloaded");
    }
    return(
        <>
        {access == "ADMIN_ACCESS" ? (
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>Average Number of Days</h1>
                <Button variant="contained" color="success" size="large" onClick={()=>{navigate('/home')}} className="btn"><ArrowBackIcon/></Button>

                <Button variant="contained" color="primary" size="large" onClick={()=>{navigate("/numberofdays")}} className="buttonnew"><AddIcon/>Add Record</Button>

                <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
            </Grid>
            <TableContainer component={Paper} className="app-container">
                <Table aria-label='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Program Name</TableCell>
                            <TableCell>Program Code</TableCell>
                            <TableCell>Semester Year</TableCell>
                            <TableCell>Last Date Of Last Semester End Exam</TableCell>
                            <TableCell>Date Of Declaration results Of semester</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow 
                                key = {student.Program_Code}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.Program_Name}</TableCell>
                                <TableCell>{student.Program_Code}</TableCell>
                                <TableCell>{student.Semester_Year}</TableCell>
                                <TableCell>{student.LastDateOf_LastSemesterEndExam}</TableCell>
                                <TableCell>{student.DateOf_Declaration_resultsOf_semester}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/numberofdays",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/avgnumberofdays/${student.Program_Code}`);
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
            <p>No Access</p>
        )}
        </>
    )
}

export default ViewAvg;