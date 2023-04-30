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

const ViewComputer = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/computerratio')
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
                            <TableCell>Name Of Department</TableCell>
                            <TableCell>Total number of students</TableCell>
                            <TableCell>Number of computers available to use</TableCell>
                            <TableCell>Bills Purchase documents</TableCell>
                            <TableCell>Proof of stock register entry</TableCell>
                            <TableCell>Student Computer Ratio</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow 
                                key = {student.Student_Unique_Enrollment}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.Name_Of_Department}</TableCell>
                                <TableCell>{student.Total_number_of_students}</TableCell>
                                <TableCell>{student.Number_of_computers_available_to_use}</TableCell>
                                <TableCell>{student.Bills_Purchase_documents}</TableCell>
                                <TableCell>{student.Proof_of_stock_register_entry}</TableCell>
                                <TableCell>{student.Student_Computer_Ratio}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/computerratio",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/computerratio/${student.Name_Of_Department}`);
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

export default ViewComputer;