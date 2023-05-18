import {TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import {Grid} from '@material-ui/core';
import Button from '@mui/material/Button';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../View.scss'
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewBtech = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/btech')
        setStudentData(response?.data);
        console.log(response);
    }
    useEffect(() => {
        getStudentData();
      },[]);
    const handleDownload = async() =>{
        await axios.post('http://localhost:4000/download/download6');
        window.alert("downloaded");
    }
    return(
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>Btech</h1>
                <Button variant="contained" color="success" size="large" onClick={()=>{navigate('/home')}} style={{marginTop:'0px',marginLeft:'-600px',position:'absolute'}}><ArrowBackIcon/></Button>

                <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
            </Grid>
            <TableContainer component={Paper} className="app-container">
                <Table aria-label='table'>
                    <TableHead> 
                        <TableRow>
                            <TableCell align="center">University RollNumber</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">Nationality</TableCell>
                            <TableCell align="center">DOB</TableCell>
                            <TableCell align="center">Phone Number</TableCell>
                            <TableCell align="center">Email ID</TableCell>
                            <TableCell align="center">ADHAR Number</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">District</TableCell>
                            <TableCell align="center">State</TableCell>
                            <TableCell align="center">Country</TableCell>
                            <TableCell align="center">Pin Code</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Sub Category</TableCell>
                            <TableCell align="center">10th CGPA</TableCell>
                            <TableCell align="center">10th Board</TableCell>
                            <TableCell align="center">10th YOP</TableCell>
                            <TableCell align="center">12th Percentage</TableCell>
                            <TableCell align="center">12th Board</TableCell>
                            <TableCell align="center">12th YOP</TableCell>
                            <TableCell align="center">Diploma Percentage</TableCell>
                            <TableCell align="center">Diploma Board</TableCell>
                            <TableCell align="center">Diploma YOP</TableCell>
                            <TableCell align="center">Course Regular/Integrated</TableCell>
                            <TableCell align="center">Branch</TableCell>
                            <TableCell align="center">College Name</TableCell>
                            <TableCell align="center">Course CGPA</TableCell>
                            <TableCell align="center">Number Of Backlogs</TableCell>
                            <TableCell align="center">Entrance Exam</TableCell>
                            <TableCell align="center">CET Rank</TableCell>
                            <TableCell align="center">Course YOP</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow 
                                key = {student.University_RollNumber}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.University_RollNumber}</TableCell>
                                <TableCell>{student.First_Name}</TableCell>
                                <TableCell>{student.Last_Name}</TableCell>
                                <TableCell>{student.Gender}</TableCell>
                                <TableCell>{student.Nationality}</TableCell>
                                <TableCell align="center">{student.DOB}</TableCell>
                                <TableCell>{student.Phone_Number}</TableCell>
                                <TableCell>{student.Email_ID}</TableCell>
                                <TableCell>{student.ADHAR_Number}</TableCell>
                                <TableCell>{student.Address}</TableCell>
                                <TableCell>{student.District}</TableCell>
                                <TableCell>{student.State}</TableCell>
                                <TableCell>{student.Country}</TableCell>
                                <TableCell>{student.Pin_Code}</TableCell>
                                <TableCell>{student.Category}</TableCell>
                                <TableCell align="center">{student.Sub_Category}</TableCell>
                                <TableCell>{student._10th_CGPA}</TableCell>
                                <TableCell>{student._10th_Board}</TableCell>
                                <TableCell>{student._10th_YOP}</TableCell>
                                <TableCell>{student._12th_Percentage}</TableCell>
                                <TableCell>{student._12th_Board}</TableCell>
                                <TableCell>{student._12th_YOP}</TableCell>
                                <TableCell>{student.Diploma_Percentage}</TableCell>
                                <TableCell>{student.Diploma_Board}</TableCell>
                                <TableCell>{student.Diploma_YOP}</TableCell>
                                <TableCell>{student.Course_RegularORIntegrated}</TableCell>
                                <TableCell align="center">{student.Branch}</TableCell>
                                <TableCell>{student.College_Name}</TableCell>
                                <TableCell>{student.Course_CGPA}</TableCell>
                                <TableCell>{student.Number_Of_Backlogs}</TableCell>
                                <TableCell>{student.Entrance_Exam}</TableCell>
                                <TableCell>{student.CET_Rank}</TableCell>
                                <TableCell>{student.Course_YOP}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/btech",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/btech/${student.University_RollNumber}`);
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

export default ViewBtech;