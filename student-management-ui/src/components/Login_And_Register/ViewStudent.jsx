import {TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import {Grid} from '@material-ui/core';
import { useEffect,useState } from 'react';
import axios from 'axios';




const ViewStudent = () =>{
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/studentsatisfactory')
        setStudentData(response?.data);
        console.log(response);
    }
    useEffect(() => {
        getStudentData();
      });
    return(
        <Grid>
            <TableContainer component={Paper}>
                <Table aria-label='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name_of_Student</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>State_of_domicille</TableCell>
                            <TableCell>Nationality_if_other_than_india</TableCell>
                            <TableCell>Email_ID</TableCell>
                            <TableCell>Program_Name</TableCell>
                            <TableCell>Student_Unique_Enrollment</TableCell>
                            <TableCell>mobile_number</TableCell>
                            <TableCell>Year_of_joining</TableCell>
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