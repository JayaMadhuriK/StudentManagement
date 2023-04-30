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

const ViewHigher = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/highereducation')
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
                            <TableCell>Name Of Teacher</TableCell>
                            <TableCell>Number Of Students Enrolled</TableCell>
                            <TableCell>Name Of Students</TableCell>
                            <TableCell>Program Graduated From</TableCell>
                            <TableCell>Name Of Institution joined</TableCell>
                            <TableCell>Name Of Programme Admitted To</TableCell>
                            <TableCell>Identity Card/Admission Letter</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow 
                                key = {student.Student_Unique_Enrollment}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.NameOfTeacher}</TableCell>
                                <TableCell>{student.NumberOf_Students_Enrolled}</TableCell>
                                <TableCell>{student.Name_Of_Students}</TableCell>
                                <TableCell>{student.Program_Graduated_From}</TableCell>
                                <TableCell>{student.Name_Of_Institution_joined}</TableCell>
                                <TableCell>{student.Name_Of_Programme_Admitted_To}</TableCell>
                                <TableCell>{student.IdentityCardORAdmissionLetter}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/highereducation",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/highereducation/${student.Student_Unique_Enrollment}`);
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

export default ViewHigher;