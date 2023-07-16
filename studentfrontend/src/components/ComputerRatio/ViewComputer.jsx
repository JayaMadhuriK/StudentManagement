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

const ViewComputer = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/computerratio')
        setStudentData(response?.data);
        console.log(response);
    };
    const handleFileOpen = (filename) => {
        axios
          .get(`http://localhost:4000/computerratio/open/${filename}`, {
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
          .get(`http://localhost:4000/computerratio/download/${filename}`, {
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
    const access = localStorage.getItem("user_access");
    useEffect(() => {
        getStudentData();
      },[]);
    const handleDownload = async() =>{
        await axios.post('http://localhost:4000/download/download13');
        window.alert("downloaded");
    }
    return(
        <>
        {access == "ADMIN_ACCESS" ? (
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>Student-Computer Ratio</h1>
                <Button variant="contained" color="success" size="large" onClick={()=>{navigate('/home')}} className="btn"><ArrowBackIcon/></Button>

                <Button variant="contained" color="primary" size="large" onClick={()=>{navigate("/studentcomputerratio")}} className="buttonnew"><AddIcon/>Add Record</Button>

                <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
            </Grid>
            <TableContainer component={Paper} className="app-container">
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
                                key = {student.Name_Of_Department}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.Name_Of_Department}</TableCell>
                                <TableCell>{student.Total_number_of_students}</TableCell>
                                <TableCell>{student.Number_of_computers_available_to_use}</TableCell>
                                <TableCell>
                                    <Grid>
                                    <Button variant="contained" size="small"  onClick={() => handleFileDownload(student.Bills_Purchase_documents)} ><DownloadIcon/></Button>
                                    <Button variant="contained" size="small" style={{marginLeft:'10px'}}  onClick={() => handleFileOpen(student.Bills_Purchase_documents)} >Open<FileOpenIcon/></Button>
                                    </Grid>
                                </TableCell>
                                <TableCell>
                                    <Grid>
                                    <Button variant="contained" size="small"  onClick={() => handleFileDownload(student.Proof_of_stock_register_entry)} ><DownloadIcon/></Button>
                                    <Button variant="contained" size="small" style={{marginLeft:'10px'}}  onClick={() => handleFileOpen(student.Proof_of_stock_register_entry)} >Open<FileOpenIcon/></Button>
                                    </Grid>
                                </TableCell>
                                <TableCell>{student.Student_Computer_Ratio}</TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/studentcomputerratio",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/computerratio/${student.Name_Of_Department}`);
                                            getStudentData();
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
        </Grid> ):(
            <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    )
}

export default ViewComputer;