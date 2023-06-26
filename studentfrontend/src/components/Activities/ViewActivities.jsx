import {TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../View.scss'
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const ViewActivities = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([]);
    const access = localStorage.getItem("user_access");
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/activities')
        setStudentData(response?.data);
        console.log(response);
    };
    const handleDownload = async() =>{
        await axios.post('http://localhost:4000/download/download7');
        window.alert("downloaded");
    };
    const handleFileOpen = (filename) => {
        axios
          .get(`http://localhost:4000/activities/open/${filename}`, {
            responseType: 'blob',
          })
          .then((response) => {
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          })
          .catch((error) => {
            console.log(error);
            // Handle error
          });
      };
    const handleFileDownload = (filename) => {
        axios
          .get(`http://localhost:4000/activities/download/${filename}`, {
            responseType: 'blob',
          })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
          })
          .catch((error) => {
            console.log(error);
            // Handle error
          });
    };
    useEffect(() => {
        getStudentData();
      },[]);
    return(
        <>
        {access == "ADMIN_ACCESS" ? (
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>Student Activities</h1>
                <Button variant="contained" color="success" size="large" onClick={()=>{navigate('/home')}} className="btn"><ArrowBackIcon/></Button>

                <Button variant="contained" color="primary" size="large" onClick={()=>{navigate("/activities")}} className="buttonnew"><AddIcon/>Add Record</Button>

                <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
            </Grid>
            <TableContainer component={Paper} className="app-container">
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
                                <TableCell>{student.Nature_of_Activity}</TableCell>
                                <TableCell>
                                    <Grid>
                                    <Button variant="contained" size="small"  onClick={() => handleFileDownload(student.Link_to_the_relevant_documents)} ><DownloadIcon/></Button>
                                    <Button variant="contained" size="small" style={{marginLeft:'10px'}}  onClick={() => handleFileOpen(student.Link_to_the_relevant_documents)} >Open<FileOpenIcon/></Button>

                                    </Grid>
                                </TableCell>
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
        ):(
            <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    )
}

export default ViewActivities;