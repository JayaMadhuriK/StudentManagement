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

const ViewPass = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/avgpasspercentage')
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
                            <TableCell>Program Name</TableCell>
                            <TableCell>Program Code</TableCell>
                            <TableCell>Number Of Students appeared in final Year examination</TableCell>
                            <TableCell>Number Of sudents Passed in final Year examination</TableCell>
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
                                <TableCell>{student.NumOfStudents_appeared_in_finalYr_examination}</TableCell>
                                <TableCell>{student.NumOfStudents_Passed_in_finalYr_examination}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/passpercentage",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/avgpasspercentage/${student.Program_Code}`);
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

export default ViewPass;