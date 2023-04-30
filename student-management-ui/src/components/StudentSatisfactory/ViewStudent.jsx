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
    return(
        <Grid>
            <TableContainer component={Paper}>
                <Table aria-label='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name of Student</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>State of domicille</TableCell>
                            <TableCell>Nationality(if other than India)</TableCell>
                            <TableCell>Email ID</TableCell>
                            <TableCell>Program Name</TableCell>
                            <TableCell>Student Unique Enrollment</TableCell>
                            <TableCell>mobile number</TableCell>
                            <TableCell>Year of joining</TableCell>
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
                                <TableCell>{student.Email_ID}</TableCell>
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