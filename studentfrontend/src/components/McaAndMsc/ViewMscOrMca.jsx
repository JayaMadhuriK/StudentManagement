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
import TextField from '@material-ui/core/TextField';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const ViewMscOrMca = () =>{
    const navigate = useNavigate();
    const [studentData,setStudentData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const access = localStorage.getItem("user_access");
    const [filteredStudentData, setFilteredStudentData] = useState([]);
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/mscormca')
        setStudentData(response?.data);
        const data = response?.data;
        const filteredData = data?.filter((student) => {
            const studentId = student.University_RollNumber.toString().includes(searchQuery.toLowerCase());
            const studentEmail = student.Email_ID.toLowerCase().includes(searchQuery.toLowerCase());
            const studentyear = student.StudyingYear.toLowerCase().includes(searchQuery.toLowerCase());
            return studentId || studentEmail || studentyear;
        });
        setFilteredStudentData(filteredData);
    }
    const handleFileOpen = (filename) => {
        axios
          .get(`http://localhost:4000/mscormca/open/${filename}`, {
            responseType: 'blob',
          })
          .then((response) => {
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    const handleFileDownload = (filename) => {
        axios
          .get(`http://localhost:4000/mscormca/download/${filename}`, {
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
      const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };
    useEffect(() => {
        getStudentData();
      },[searchQuery]);
    const handleDownload = async() =>{
        await axios.post('http://localhost:4000/download/download9');
        window.alert("downloaded");
    }
    return(
        <>
        {access == "ADMIN_ACCESS" ? (
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>MSC & MCA</h1>
                <Button variant="contained" color="success" size="large" onClick={()=>{navigate('/home')}} style={{marginTop:'0px',marginLeft:'-600px',position:'absolute',backgroundColor:'rgb(8, 15, 105)'}}><ArrowBackIcon/></Button>
                <TextField variant="standard" style={{marginLeft:"-500px",position:"absolute",color:"white"}} placeholder='Search' value={searchQuery} onChange={handleSearchQueryChange}></TextField>
                <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
            </Grid>
            <TableContainer component={Paper} className="app-container">
                <Table aria-label='table'>
                    <TableHead> 
                        <TableRow>
                            <TableCell align="center">University RollNumber</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">Nationality</TableCell>
                            <TableCell align="center">DOB</TableCell>
                            <TableCell align="center">Phone Number</TableCell>
                            <TableCell align="center">Email ID</TableCell>
                            <TableCell align="center">ADHAR Number</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">District</TableCell>
                            <TableCell align="center">State</TableCell>
                            <TableCell align="center">Country</TableCell>
                            <TableCell align="center">Pin Code</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Sub Category</TableCell>
                            <TableCell align="center">10th CGPA</TableCell>
                            <TableCell align="center">10th Board</TableCell>
                            <TableCell align="center">10th YOP</TableCell>
                            <TableCell align="center">12th Percentage</TableCell>
                            <TableCell align="center">12th Board</TableCell>
                            <TableCell align="center">12th YOP</TableCell>
                            <TableCell align="center"> Degree</TableCell>
                            <TableCell align="center">Degree Specialization</TableCell>
                            <TableCell align="center">Degree Score</TableCell>
                            <TableCell align="center">Degree University</TableCell>
                            <TableCell align="center">Degree College</TableCell>
                            <TableCell align="center">Degree YOP</TableCell>
                            <TableCell align="center">MSC/MCA</TableCell>
                            <TableCell align="center">Course Branch</TableCell>
                            <TableCell align="center">College</TableCell>
                            <TableCell align="center">Entrance CET</TableCell>
                            <TableCell align="center">CET Rank</TableCell>
                            <TableCell align="center">MSc/MCA CGPA</TableCell>
                            <TableCell align="center">Number Of Backlogs</TableCell>
                            <TableCell align="center">Year Of Passing</TableCell>
                            <TableCell align="center">Studying Year</TableCell>
                            <TableCell align="center">Certificate Course</TableCell>
                            <TableCell align="center">IssuedBy</TableCell>
                            <TableCell align="center">Platform</TableCell>
                            <TableCell align="center">Files</TableCell>
                            <TableCell align="center">Number Of Companies selected</TableCell>
                            <TableCell align="center">Company Name</TableCell>
                            <TableCell align="center">Pay Package</TableCell>
                            <TableCell align="center">Files</TableCell>
                            <TableCell align="center">Internship Company Name</TableCell>
                            <TableCell align="center">Internship Duration</TableCell>
                            <TableCell align="center">Files</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {filteredStudentData.length>0 ? (
                    <TableBody>
                        {filteredStudentData.map((student) => (
                            <TableRow 
                                key = {student.University_RollNumber}
                                sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                            >
                                <TableCell>{student.University_RollNumber}</TableCell>
                                <TableCell>{student.First_Name}</TableCell>
                                <TableCell>{student.Last_Name}</TableCell>
                                <TableCell>{student.Gender}</TableCell>
                                <TableCell>{student.Nationality}</TableCell>
                                <TableCell align="center">{student.DOB}</TableCell>
                                <TableCell>{student.Phone_Number}</TableCell>
                                <TableCell>{student.Email_ID}</TableCell>
                                <TableCell>{student.ADHAR_Number}</TableCell>
                                <TableCell>{student.Address}</TableCell>
                                <TableCell>{student.District}</TableCell>
                                <TableCell>{student.State}</TableCell>
                                <TableCell>{student.Country}</TableCell>
                                <TableCell>{student.Pin_Code}</TableCell>
                                <TableCell>{student.Category}</TableCell>
                                <TableCell align="center">{student.Sub_Category}</TableCell>
                                <TableCell>{student._10th_CGPA}</TableCell>
                                <TableCell>{student._10th_Board}</TableCell>
                                <TableCell>{student._10th_YOP}</TableCell>
                                <TableCell>{student._12th_Percentage}</TableCell>
                                <TableCell>{student._12th_Board}</TableCell>
                                <TableCell>{student._12th_YOP}</TableCell>
                                <TableCell>{student.Degree}</TableCell>
                                <TableCell>{student.Degree_Specialization}</TableCell>
                                <TableCell>{student.Degree_Score}</TableCell>
                                <TableCell>{student.Degree_University}</TableCell>
                                <TableCell align="center">{student.Degree_College}</TableCell>
                                <TableCell>{student.Degree_YOP}</TableCell>
                                <TableCell>{student.MSC_OR_MCA}</TableCell>
                                <TableCell>{student.Course_Branch}</TableCell>
                                <TableCell>{student.College}</TableCell>
                                <TableCell>{student.Entrance_CET}</TableCell>
                                <TableCell>{student.CET_Rank}</TableCell>
                                <TableCell>{student.MSC_OR_MCA_CGPA}</TableCell>
                                <TableCell>{student.Number_Of_Backlogs}</TableCell>
                                <TableCell>{student.YOP}</TableCell>
                                <TableCell>{student.StudyingYear}</TableCell>
                                <TableCell>{student.Certificate_Course}</TableCell>
                                <TableCell>{student.Certificate_IssuedBy}</TableCell>
                                <TableCell>{student.CertificatePlatform}</TableCell>
                                <TableCell>
                                    <Grid>
                                        <Button variant="contained" size="small"  onClick={() => handleFileDownload(student.CertificateUpload)} ><DownloadIcon/></Button>
                                        <Button variant="contained" size="small" style={{marginLeft:'70px',marginTop:'-55px'}}  onClick={() => handleFileOpen(student.CertificateUpload)} >Open<FileOpenIcon/></Button>
                                    </Grid>
                                </TableCell>
                                <TableCell>{student.NumberOfCompanies}</TableCell>
                                <TableCell>{student.Company}</TableCell>
                                <TableCell>{student.Package}</TableCell>
                                <TableCell>
                                    <Grid>
                                        <Button variant="contained" size="small"  onClick={() => handleFileDownload(student.Upload)} ><DownloadIcon/></Button>
                                        <Button variant="contained" size="small" style={{marginLeft:'70px',marginTop:'-55px'}}  onClick={() => handleFileOpen(student.Upload)} >Open<FileOpenIcon/></Button>
                                    </Grid>
                                </TableCell>
                                <TableCell>{student.InternCompany}</TableCell>
                                <TableCell>{student.InternDuration}</TableCell>
                                <TableCell>
                                    <Grid>
                                        <Button variant="contained" size="small"  onClick={() => handleFileDownload(student.InternUpload)} ><DownloadIcon/></Button>
                                        <Button variant="contained" size="small" style={{marginLeft:'70px',marginTop:'-55px'}}  onClick={() => handleFileOpen(student.InternUpload)} >Open<FileOpenIcon/></Button>
                                    </Grid>
                                </TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        <Button variant="contained" size="small" onClick={()=>{navigate("/mscormca",{state:{student:student}})}}>Edit</Button>
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/mscormca/${student.University_RollNumber}`);
                                            window.location.reload(false);
                                        }} 
                                        color="error" size="small">Delete</Button>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                    ):(
                        <Grid>
                            <p align="center">No Records Found</p>
                        </Grid>
                    )}
                </Table>
            </TableContainer>
        </Grid>):(
            <h1 style={{color:"red",marginTop:"300px"}}> 401 UnAuthorized! No Access</h1>
        )}
        </>
    )
}

export default ViewMscOrMca;