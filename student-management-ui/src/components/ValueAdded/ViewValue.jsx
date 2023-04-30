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

const ViewValue = (url,url1) =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get(url)
        setStudentData(response?.data);
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
                            <TableCell>Name Of Value Added Courses Offered</TableCell>
                            <TableCell>Course Code</TableCell>
                            <TableCell>Year Of Offering</TableCell>
                            <TableCell>Number Of times Offered During Same Year</TableCell>
                            <TableCell>Duration Of Course</TableCell>
                            <TableCell>Number Of Students Enrolled In year</TableCell>
                            <TableCell>Number Of Students Completed</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow 
                                key = {student.Course_Code}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.Name_Of_ValueAddedCourses_Offered}</TableCell>
                                <TableCell>{student.Course_Code}</TableCell>
                                <TableCell>{student.Yr_Of_Offering}</TableCell>
                                <TableCell>{student.Num_Of_times_Offered_DuringSameYr}</TableCell>
                                <TableCell>{student.Duration_Of_Course}</TableCell>
                                <TableCell>{student.Num_Of_Students_Enrolled_In_Yr}</TableCell>
                                <TableCell>{student.Num_Of_Students_Completed}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate(url1,{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(url+`/${student.Course_Code}`);
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

export default ViewValue;