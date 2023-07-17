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

const ViewPlacements = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/placement')
        setStudentData(response?.data);
        console.log(response);
    }
    const handleFileOpen = (filename) => {
        axios
          .get(`http://localhost:4000/placement/open/${filename}`, {
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
          .get(`http://localhost:4000/placement/download/${filename}`, {
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
        await axios.post('http://localhost:4000/download/download5');
        window.alert("downloaded");
    }
    return(
        <>
        {access == "ADMIN_ACCESS" ? (
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>Placements</h1>
                <Button variant="contained" color="success" size="large" onClick={()=>{navigate('/home')}} className="btn"><ArrowBackIcon/></Button>

                {/* <Button variant="contained" color="primary" size="large" onClick={()=>{navigate("/placements")}} className="buttonnew"><AddIcon/>Add Record</Button> */}

                <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
            </Grid>
            <TableContainer component={Paper} className="app-container">
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
                            <TableCell>File</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentData.map((studentplace) => (
                            <TableRow 
                                key = {studentplace.Id}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{studentplace.Year}</TableCell>
                                <TableCell>{studentplace.Name_of_the_Teacher}</TableCell>
                                <TableCell>{studentplace.NumberOfStudentsGuided}</TableCell>
                                <TableCell>{studentplace.Contact_Details}</TableCell>
                                <TableCell>{studentplace.Program_graduated_from}</TableCell>
                                <TableCell>{studentplace.Name_of_company}</TableCell>
                                <TableCell>{studentplace.Name_of_employer_with_contact_details}</TableCell>
                                <TableCell>{studentplace.Pay_package_at_appointment}</TableCell>
                                <TableCell>
                                    <Grid>
                                    <Button variant="contained" size="small"  onClick={() => handleFileDownload(studentplace.PlaceFile)} ><DownloadIcon/></Button>
                                    <Button variant="contained" size="small" style={{marginLeft:'70px',marginTop:'-55px'}}  onClick={() => handleFileOpen(studentplace.PlaceFile)} >Open<FileOpenIcon/></Button>
                                    </Grid>
                                </TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        {/* <Button variant="contained" size="small" onClick={()=>{navigate("/placements",{state:{studentplace:studentplace}})}}>Edit</Button> */}
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/placement/${studentplace.Id}`);
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
        </Grid>):(
            <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    )
}

export default ViewPlacements;