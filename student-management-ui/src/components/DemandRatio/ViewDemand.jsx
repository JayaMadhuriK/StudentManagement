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

const ViewDemand = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/demandratio')
        setStudentData(response?.data);
        console.log(response);
    }
    useEffect(() => {
        getStudentData();
      },[]);
    const handleDownload = async() =>{
        await axios.post('http://localhost:4000/download/download8');
        window.alert("downloaded");
    }
    return(
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>Demand Ratio</h1>
                <Button variant="contained" color="primary" size="large" onClick={()=>{navigate("/demandratio")}} className="buttonnew"><AddIcon/>Add Record</Button>
                <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
            </Grid>
            <TableContainer component={Paper} className="app-container">
                <Table aria-label='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Program_Name</TableCell>
                            <TableCell>Program_Code</TableCell>
                            <TableCell>No_Of_Seats_Available</TableCell>
                            <TableCell>No_Of_Eligible_ApplicationReceived</TableCell>
                            <TableCell>No_Of_Students_Admitted</TableCell>
                            <TableCell>Demand_Ratio_OR_Year</TableCell>
                            <TableCell>Avg_Of_Last5Years</TableCell>
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
                                <TableCell>{student.No_Of_Seats_Available}</TableCell>
                                <TableCell>{student.No_Of_Eligible_ApplicationReceived}</TableCell>
                                <TableCell>{student.No_Of_Students_Admitted}</TableCell>
                                <TableCell>{student.Demand_Ratio_OR_Year}</TableCell>
                                <TableCell>{student.Avg_Of_Last5Years}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/demandratio",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/demandratio/${student.Program_Code}`);
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

export default ViewDemand;