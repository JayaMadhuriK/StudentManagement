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

const ViewActivities = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/activities')
        setStudentData(response?.data);
        console.log(response);
    };
    useEffect(() => {
        getStudentData();
      },[]);
    return(
        <Grid>
            <TableContainer component={Paper}>
                <Table aria-label='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title of collaborative activity</TableCell>
                            <TableCell>Name of collaborative agency with contact details</TableCell>
                            <TableCell>Name of Participant</TableCell>
                            <TableCell>Year of collaboration</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>NatureofActivity</TableCell>
                            <TableCell>Link to the relevant documents</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow 
                                key = {student.Title_of_collaborative_activity}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.Title_of_collaborative_activity}</TableCell>
                                <TableCell>{student.Name_of_collaborative_agency_with_contact_details}</TableCell>
                                <TableCell>{student.Name_of_Participant}</TableCell>
                                <TableCell>{student.Year_of_collaboration}</TableCell>
                                <TableCell>{student.Duration}</TableCell>
                                <TableCell>{student.NatureofActivity}</TableCell>
                                <TableCell>{student.Link_to_the_relevant_documents}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/activities",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/activities/${student.Title_of_collaborative_activity}`);
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

export default ViewActivities;