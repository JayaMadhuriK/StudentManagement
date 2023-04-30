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

const ViewPlacements = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/placement')
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
                            <TableCell>Year</TableCell>
                            <TableCell>Name of the Teacher</TableCell>
                            <TableCell>NumberOfStudentsGuided</TableCell>
                            <TableCell>Contact_Details</TableCell>
                            <TableCell>Program_graduated_from</TableCell>
                            <TableCell>Name_of_company</TableCell>
                            <TableCell>Name_of_employer_with_contact_details</TableCell>
                            <TableCell>Pay_package_at_appointment</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow 
                                key = {student.Name_of_the_Teacher}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.Year}</TableCell>
                                <TableCell>{student.Name_of_the_Teacher}</TableCell>
                                <TableCell>{student.NumberOfStudentsGuided}</TableCell>
                                <TableCell>{student.Contact_Details}</TableCell>
                                <TableCell>{student.Program_graduated_from}</TableCell>
                                <TableCell>{student.Name_of_company}</TableCell>
                                <TableCell>{student.Name_of_employer_with_contact_details}</TableCell>
                                <TableCell>{student.Pay_package_at_appointment}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/placements",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/placement/${student.Name_of_the_Teacher}`);
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

export default ViewPlacements;