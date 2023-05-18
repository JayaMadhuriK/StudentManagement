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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const ViewInternships = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/internships')
        setStudentData(response?.data);
        console.log(response);
    };
    const handleFileOpen = (filename) => {
        axios
          .get(`http://localhost:4000/internships/open/${filename}`, {
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
          .get(`http://localhost:4000/internships/download/${filename}`, {
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
    const handleDownload = async() =>{
        await axios.post('http://localhost:4000/download/download2');
        window.alert("downloaded");
    }
    return(
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>Internships</h1>
                <Button variant="contained" color="success" size="large" onClick={()=>{navigate('/home')}} className="btn"><ArrowBackIcon/></Button>

                <Button variant="contained" color="primary" size="large" onClick={()=>{navigate("/internships")}} className="buttonnew"><AddIcon/>Add Record</Button>

                <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
            </Grid>
            <TableContainer component={Paper} className="app-container">
                <Table aria-label='table'>
                    <TableHead>
                        <TableRow>
                            <TableCell> Program Name</TableCell>
                            <TableCell>Program Code</TableCell>
                            <TableCell>list of students undertakig field projects/researchs/internships</TableCell>
                            <TableCell>link to relevant documents</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((student) => (
                            <TableRow 
                                key = {student.Program_code}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.Program_name}</TableCell>
                                <TableCell>{student.Program_code}</TableCell>
                                <TableCell>{student.list_of_students_undertakig_field_projects_researchs_internships}</TableCell>
                                <TableCell>
                                    <Grid>
                                    <Button variant="contained" size="small"  onClick={() => handleFileDownload(student.link_to_relevant_documents)} ><DownloadIcon/></Button>
                                    <Button variant="contained" size="small" style={{marginLeft:'10px'}}  onClick={() => handleFileOpen(student.link_to_relevant_documents)} >Open<FileOpenIcon/></Button>
                                    </Grid>
                                </TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/internships",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/internships/${student.Program_code}`);
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

export default ViewInternships;