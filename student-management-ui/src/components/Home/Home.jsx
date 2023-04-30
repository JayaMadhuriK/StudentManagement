import logo from '../../resources/logo.jpg'
import {Grid} from '@material-ui/core'
import './Home.scss'
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';

const Home = () =>{
    const navigate = useNavigate();
    return(
        <Grid className="home">
            <Grid className="home-grid1">
                <FormControl>
                    <img src={logo} className="register-logo" alt="logo" />
                    <FormLabel className="home-label">
                        Home Page
                    </FormLabel>
                    <FormLabel className="home-label1">
                        Welcome 
                    </FormLabel>
                </FormControl>
            </Grid>
            <Grid className="head">
                <Button ClassName="button1" onClick={()=>{navigate("/viewactivities")}} variant="text"><font color="black">Activties</font></Button>
                <Button ClassName="button2" onClick={()=>{navigate("/viewawards")}} variant="text"><font color="black">Awards</font></Button>
                <Button ClassName="button3" onClick={()=>{navigate("/viewcomputers")}} variant="text"><font color="black">ComputerRatio</font></Button>
                <Button ClassName="button4" onClick={()=>{navigate("/viewcouncil")}} variant="text"><font color="black">CouncilActivity</font></Button>
                <Button ClassName="button5" onClick={()=>{navigate("/viewdemand")}} variant="text"><font color="black">DemandRatio</font></Button>
                <Button ClassName="button6" onClick={()=>{navigate("/viewhigher")}} variant="text"><font color="black">HigherEducation</font></Button>
                <Button ClassName="button7" onClick={()=>{navigate("/viewinternships")}} variant="text"><font color="black">Internships</font></Button>
                <Button ClassName="button8" onClick={()=>{navigate("/viewavg")}} variant="text"><font color="black">NumberOfDays</font></Button>
                <Button ClassName="button9" onClick={()=>{navigate("/viewpass")}} variant="text"><font color="black">PassPercentage</font></Button>
                <Button ClassName="button10" onClick={()=>{navigate("/viewplacements")}} variant="text"><font color="black">Placements</font></Button>
                <Button ClassName="button11" onClick={()=>{navigate("/home")}} variant="text">Value Added</Button>
                <Button ClassName="button12" onClick={()=>{navigate("/viewstudent")}} variant="text"><font color="black">Student Satisfactory</font></Button>
                <Button ClassName="button12" onClick={()=>{navigate("/viewvalue1")}} variant="text"><font color="black">value added year1</font></Button>
                <Button ClassName="button12" onClick={()=>{navigate("/viewvalue2")}} variant="text"><font color="black">value added year2</font></Button>
                <Button ClassName="button12" onClick={()=>{navigate("/viewvalue3")}} variant="text"><font color="black">value added year3</font></Button>
                <Button ClassName="button12" onClick={()=>{navigate("/viewvalue4")}} variant="text"><font color="black">value added year4</font></Button>
                <Button ClassName="button12" onClick={()=>{navigate("/viewvalue5")}} variant="text"><font color="black">value added year5</font></Button>
            </Grid>
        </Grid>
    )
}
export default Home;