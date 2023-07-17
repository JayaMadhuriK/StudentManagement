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
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@material-ui/core/TextField';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const ViewBtech = () =>{
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStudentData, setFilteredStudentData] = useState([]);
    const [studentData,setStudentData] = useState([])
    const getStudentData = async () =>{
        const response =await axios.get('http://localhost:4000/btech')
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
          .get(`http://localhost:4000/btech/open/${filename}`, {
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
    const access = localStorage.getItem("user_access");
    const handleFileDownload = (filename) => {
        axios
          .get(`http://localhost:4000/btech/download/${filename}`, {
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
          });
      };
    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };
    useEffect(() => {
        getStudentData();
      },[searchQuery]);
    const handleDownload = async() =>{
        await axios.post('http://localhost:4000/download/download6');
        window.alert("downloaded");
    }
    return(
        <>
        {access == "ADMIN_ACCESS" ? (
        <Grid className="grid">
            <Grid className="grid-btn">
                <h1>Btech</h1>
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
                            <TableCell align="center">Diploma Percentage</TableCell>
                            <TableCell align="center">Diploma Board</TableCell>
                            <TableCell align="center">Diploma YOP</TableCell>
                            <TableCell align="center">Course Regular/Integrated</TableCell>
                            <TableCell align="center">Branch</TableCell>
                            <TableCell align="center">College Name</TableCell>
                            <TableCell align="center">Course CGPA</TableCell>
                            <TableCell align="center">Number Of Backlogs</TableCell>
                            <TableCell align="center">Entrance Exam</TableCell>
                            <TableCell align="center">CET Rank</TableCell>
                            <TableCell align="center">Course YOP</TableCell>
                            <TableCell align="center">Studying Year</TableCell>
                            <TableCell align="center">Certificate Course</TableCell>
                            <TableCell align="center">IssuedBy</TableCell>
                            <TableCell align="center">Platform</TableCell>
                            <TableCell align="center">Certificate</TableCell>
                            <TableCell align="center">Program name</TableCell>
                            <TableCell align="center">Program code</TableCell>
                            <TableCell align="center">List of students undertaking in internships</TableCell>
                            <TableCell align="center">Certificate</TableCell>
                            <TableCell align="center">Year</TableCell>
                            <TableCell align="center">Name of teacher for Placements</TableCell>
                            <TableCell align="center">Contact details</TableCell>
                            <TableCell align="center">Program Graduated from</TableCell>
                            <TableCell align="center">Name of Company</TableCell>
                            <TableCell align="center">Name of employer and contact details</TableCell>
                            <TableCell align="center">Pay Package</TableCell>
                            <TableCell align="center">File</TableCell>
                            <TableCell align="center">Name of teacher for Higher Education</TableCell>
                            <TableCell align="center">Name of student</TableCell>
                            <TableCell align="center">Program Graduated from</TableCell>
                            <TableCell align="center">Name of Institution</TableCell>
                            <TableCell align="center">Name of Program Admitted to</TableCell>
                            <TableCell align="center">File</TableCell>
                             <TableCell align="center">Year</TableCell>
                            <TableCell align="center">Registeration Number</TableCell>
                            <TableCell align="center">NET</TableCell>
                            <TableCell align="center">SLET</TableCell>
                            <TableCell align="center">GATE</TableCell>
                            <TableCell align="center">GMAT</TableCell>
                            <TableCell align="center">CAT</TableCell>
                            <TableCell align="center">GRE</TableCell>
                            <TableCell align="center">JAM</TableCell>
                            <TableCell align="center">IELET</TableCell>
                            <TableCell align="center">TOEFL</TableCell>
                            <TableCell align="center">Civil_Services</TableCell>
                            <TableCell align="center">State_government</TableCell>
                            <TableCell align="center">Other_examinations</TableCell>
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
                                <TableCell>{student.Diploma_Percentage}</TableCell>
                                <TableCell>{student.Diploma_Board}</TableCell>
                                <TableCell>{student.Diploma_YOP}</TableCell>
                                <TableCell>{student.Course_RegularORIntegrated}</TableCell>
                                <TableCell align="center">{student.Branch}</TableCell>
                                <TableCell>{student.College_Name}</TableCell>
                                <TableCell>{student.Course_CGPA}</TableCell>
                                <TableCell>{student.Number_Of_Backlogs}</TableCell>
                                <TableCell>{student.Entrance_Exam}</TableCell>
                                <TableCell>{student.CET_Rank}</TableCell>
                                <TableCell>{student.Course_YOP}</TableCell>
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
                                <TableCell>{student.Program_name}</TableCell>
                                <TableCell>{student.Program_code}</TableCell>
                                <TableCell>{student.list_of_students_undertaking}</TableCell>
                                <TableCell>
                                    <Grid>
                                        <Button variant="contained" size="small"  onClick={() => handleFileDownload(student.InternUpload)} ><DownloadIcon/></Button>
                                        <Button variant="contained" size="small" style={{marginLeft:'70px',marginTop:'-55px'}}  onClick={() => handleFileOpen(student.InternUpload)} >Open<FileOpenIcon/></Button>
                                    </Grid>
                                </TableCell>
                                <TableCell>{student.Year}</TableCell>
                                <TableCell>{student.Name_of_the_Teacher}</TableCell>
                                <TableCell>{student.Contact_Details}</TableCell>
                                <TableCell>{student.Program_graduated_from}</TableCell>
                                <TableCell>{student.Name_of_company}</TableCell>
                                <TableCell>{student.Name_of_employer_with_contact_details}</TableCell>
                                <TableCell>{student.Pay_Package_at_appointment}</TableCell>
                                <TableCell>
                                    <Grid>
                                        <Button variant="contained" size="small"  onClick={() => handleFileDownload(student.PlaceFile)} ><DownloadIcon/></Button>
                                        <Button variant="contained" size="small" style={{marginLeft:'70px',marginTop:'-55px'}}  onClick={() => handleFileOpen(student.PlaceFile)} >Open<FileOpenIcon/></Button>
                                    </Grid>
                                </TableCell>
                                <TableCell>{student.NameOfTeacher}</TableCell>
                                <TableCell>{student.Name_Of_Students}</TableCell>
                                <TableCell>{student.Program_Graduated}</TableCell>
                                <TableCell>{student.Name_Of_Institution_joined}</TableCell>
                                <TableCell>{student.Name_Of_Programme_Admitted_To}</TableCell>
                                <TableCell>
                                    <Grid>
                                        <Button variant="contained" size="small"  onClick={() => handleFileDownload(student.Upload)} ><DownloadIcon/></Button>
                                        <Button variant="contained" size="small" style={{marginLeft:'70px',marginTop:'-55px'}}  onClick={() => handleFileOpen(student.Upload)} >Open<FileOpenIcon/></Button>
                                    </Grid>
                                </TableCell>
                                <TableCell>{student.yearforexamination}</TableCell>
                                <TableCell>{student.Registeration_Number}</TableCell>
                                <TableCell>{student.NET}</TableCell>
                                <TableCell>{student.SLET}</TableCell>
                                <TableCell>{student.GATE}</TableCell>
                                <TableCell>{student.GMAT}</TableCell>
                                <TableCell>{student.CAT}</TableCell>
                                <TableCell>{student.GRE}</TableCell>
                                <TableCell>{student.JAM}</TableCell>
                                <TableCell>{student.IELET}</TableCell>
                                <TableCell>{student.TOEFL}</TableCell>
                                <TableCell>{student.Civil_Services}</TableCell>
                                <TableCell>{student.State_government}</TableCell>
                                <TableCell>{student.Other_examinations}</TableCell>
                                <TableCell>
                                    <Grid>
                                        <Button variant="contained" size="small"  onClick={() => handleFileDownload(student.ExamFile)} ><DownloadIcon/></Button>
                                        <Button variant="contained" size="small" style={{marginLeft:'70px',marginTop:'-55px'}}  onClick={() => handleFileOpen(student.ExamFile)} >Open<FileOpenIcon/></Button>
                                    </Grid>
                                </TableCell>
                                <TableCell align="center" scope="row" component="th">
                                    <Grid style={{display:'flex'}}>
                                        {/* <Button variant="contained" size="small" onClick={()=>{navigate("/btech",{state:{student:student}})}}>Edit</Button> */}
                                        <Button variant="contained" style={{marginLeft:'10px'}} 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:4000/btech/${student.University_RollNumber}`);
                                            axios.delete(`http://localhost:4000/login/${student.Email_ID}`)
                                            getStudentData();
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
            <p>No Access</p>
        )}
        </>
    )
}

export default ViewBtech;