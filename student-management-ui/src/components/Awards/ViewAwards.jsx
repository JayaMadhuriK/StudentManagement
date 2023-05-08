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
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

const ViewAwards = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/awards')
        setStudentData(response?.data);
        console.log(response);
    }
    useEffect(() => {
        getStudentData();
      },[]);
    const handleDownload = async() =>{
        await axios.post('http://localhost:4000/download/download11');
        window.alert("downloaded");
    }
    return(
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>Awards</h1>
                <Button variant="contained" color="primary" size="large" onClick={()=>{navigate("/awards")}} className="buttonnew"><AddIcon/>Add Record</Button>

                <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
            </Grid>
            <TableContainer component={Paper} className="app-container">
                <Table aria-label='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Year</TableCell>
                            <TableCell>Name Of Award</TableCell>
                            <TableCell>Team OR Individual</TableCell>
                            <TableCell>InterUniversity/State/National/International</TableCell>
                            <TableCell>Name Of Event</TableCell>
                            <TableCell>Name Of Student</TableCell>
                            <TableCell>University RollNumber</TableCell>
                            <TableCell>E-Copy Of Award Letter</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow 
                                key = {student.Name_Of_Award}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.Year}</TableCell>
                                <TableCell>{student.Name_Of_Award}</TableCell>
                                <TableCell>{student.TeamORIndividual}</TableCell>
                                <TableCell>{student.InterUniversity_State_National_International}</TableCell>
                                <TableCell>{student.Name_Of_Event}</TableCell>
                                <TableCell>{student.Name_Of_Student}</TableCell>
                                <TableCell>{student.University_RollNumber}</TableCell>
                                <TableCell>{student.E_Copy_Of_Award_Letter}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/awards",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/awards/${student.Name_Of_Award}`);
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

export default ViewAwards;