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

const ViewValue3 = () =>{
  const navigate = useNavigate();
  const [studentData,setStudentData] = useState([])
  const getStudentData = async () =>{
      const response =await axios.get('http://localhost:4000/valueaddedYr3')
      setStudentData(response?.data);
  }
  useEffect(() => {
      getStudentData();
    },[]);
    const access = localStorage.getItem("user_access");
  const handleDownload = async() =>{
      await axios.post('http://localhost:4000/download/download17');
      window.alert("downloaded");
  }
  return(
    <>
    {access == "ADMIN_ACCESS" ? (
      <Grid className="grid">
          <Grid className="grid-btn">
              <h1>Value Added Course Year3</h1>
              <Button variant="contained" color="success" size="large" onClick={()=>{navigate('/home')}} className="btn"><ArrowBackIcon/></Button>

              <Button variant="contained" color="primary" size="large" onClick={()=>{navigate('/valueaddedyr3')}} className="buttonnew"><AddIcon/>Add Record</Button>

              <Button variant="contained" color="success" size="large" onClick={handleDownload} className="button"><DownloadIcon/>Download</Button>
          </Grid>
          <TableContainer component={Paper} className="app-container">
              <Table aria-label='table'>
                  <TableHead>
                      <TableRow>
                          <TableCell>Name Of Value Added Courses Offered</TableCell>
                          <TableCell>Course Code</TableCell>
                          <TableCell>Year Of Offering</TableCell>
                          <TableCell>Number Of times Offered During Same Year</TableCell>
                          <TableCell>Duration Of Course</TableCell>
                          <TableCell>Number Of Students Enrolled In year</TableCell>
                          <TableCell>Number Of Students Completed</TableCell>
                          <TableCell align="center">Actions</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {studentData.map((student) => (
                          <TableRow 
                              key = {student.Course_Code}
                              sx = {{ '&:last-child td, &:last-child th': {border:0} }}
                          >
                              <TableCell>{student.Name_Of_ValueAddedCourses_Offered}</TableCell>
                              <TableCell>{student.Course_Code}</TableCell>
                              <TableCell>{student.Yr_Of_Offering}</TableCell>
                              <TableCell>{student.Num_Of_times_Offered_DuringSameYr}</TableCell>
                              <TableCell>{student.Duration_Of_Course}</TableCell>
                              <TableCell>{student.Num_Of_Students_Enrolled_In_Yr}</TableCell>
                              <TableCell>{student.Num_Of_Students_Completed}</TableCell>
                              <TableCell align="center" scope="row" component="th">
                                  <Grid style={{display:'flex'}}>
                                      <Button variant="contained" size="small" onClick={()=>{navigate('/valueaddedyr3',{state:{student:student}})}}>Edit</Button>
                                      <Button variant="contained" style={{marginLeft:'10px'}} 
                                      onClick={()=>{
                                          axios.delete('http://localhost:4000/valueaddedYr3'+`/${student.Course_Code}`);
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
      </Grid>  ):(
            <p>No Access</p>
        )}
        </>
  )
}

export default ViewValue3;