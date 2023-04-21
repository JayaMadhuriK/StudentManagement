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
                <Button ClassName="button1" onClick={()=>{navigate("/activities")}} variant="text">Activties</Button>
                <Button ClassName="button2" onClick={()=>{navigate("/awards")}} variant="text">Awards</Button>
                <Button ClassName="button3" onClick={()=>{navigate("/studentcomputerratio")}} variant="text">ComputerRatio</Button>
                <Button ClassName="button4" onClick={()=>{navigate("/councilactivity")}} variant="text">CouncilActivity</Button>
                <Button ClassName="button5" onClick={()=>{navigate("/demandratio")}} variant="text">DemandRatio</Button>
                <Button ClassName="button6" onClick={()=>{navigate("/highereducation")}} variant="text">HigherEducation</Button>
                <Button ClassName="button7" onClick={()=>{navigate("/internships")}} variant="text">Internships</Button>
                <Button ClassName="button8" onClick={()=>{navigate("/numberofdays")}} variant="text">NumberOfDays</Button>
                <Button ClassName="button9" onClick={()=>{navigate("/passpercentage")}} variant="text">PassPercentage</Button>
                <Button ClassName="button10" onClick={()=>{navigate("/placements")}} variant="text">Placements</Button>
                <Button ClassName="button11" onClick={()=>{navigate("/home")}} variant="text">Value Added</Button>
                <Button ClassName="button12" onClick={()=>{navigate("/studentsatisfactory")}} variant="text">Student Satisfactory</Button>
                <Button ClassName="button12" onClick={()=>{navigate("/valueaddedyr1")}} variant="text">value added year1</Button>
                <Button ClassName="button12" onClick={()=>{navigate("/valueaddedyr2")}} variant="text">value added year2</Button>
                <Button ClassName="button12" onClick={()=>{navigate("/valueaddedyr3")}} variant="text">value added year3</Button>
                <Button ClassName="button12" onClick={()=>{navigate("/valueaddedyr4")}} variant="text">value added year4</Button>
                <Button ClassName="button12" onClick={()=>{navigate("/valueaddedyr5")}} variant="text">value added year5</Button>
            </Grid>
        </Grid>
    )
   
}

export default Home;