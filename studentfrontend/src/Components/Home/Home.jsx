import logo from '../logo.jpg'
import {Grid} from '@material-ui/core'
import './HomeAdmin.scss'
import Button from '@mui/material/Button';
import { FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React,{useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Home = () =>{
    const navigate = useNavigate();
    const [isDialogOpen,setIsDialogOpen] = useState(false);
    const [isLogOutDialogOpen,setIsLogOutDialogOpen] = useState(false);

    const handleClose = () =>{
        setIsDialogOpen(false);
    };
    const handleLogOut = () => {
        navigate("/")
    };
    const handleLogOutClose = () =>{
        setIsLogOutDialogOpen(false);
    };
    return(
        <Grid className="home-admin">
            <Grid className="grid1">
                <img src={logo} className="register-logo" alt="logo" />
                <FormLabel className="au">AU</FormLabel>
                <FormLabel className="welcome">Welcome</FormLabel>
                <Button onClick={()=>{setIsLogOutDialogOpen(true)}} style={{marginLeft:"540px"}} variant="standard"><font color="white">Logout</font></Button>
            </Grid>

            <Grid className="grid2">
                <Grid className="btn-1">
                <h4><Button ClassName="button1" onClick={()=>{navigate("/viewactivities")}} variant="standard"><font color="white">Activties</font></Button></h4>
                <h4><Button ClassName="button2" onClick={()=>{navigate("/viewawards")}} variant="standard"><font color="white">Awards</font></Button></h4>
                <h4><Button ClassName="button3" onClick={()=>{navigate("/viewcomputers")}} variant="standard"><font color="white">ComputerRatio</font></Button></h4>
                <h4><Button ClassName="button4" onClick={()=>{navigate("/viewcouncil")}} variant="standard"><font color="white">CouncilActivity</font></Button></h4>
                <h4><Button ClassName="button5" onClick={()=>{navigate("/viewdemand")}} variant="standard"><font color="white">DemandRatio</font></Button></h4>
                </Grid>
                <Grid className="btn-2">
                <h4><Button ClassName="button6" onClick={()=>{navigate("/viewhigher")}} variant="standard"><font color="white">HigherEducation</font></Button></h4>
                <h4><Button ClassName="button7" onClick={()=>{navigate("/viewinternships")}} variant="standard"><font color="white">Internships</font></Button></h4>
                <h4><Button ClassName="button8" onClick={()=>{navigate("/viewavg")}} variant="standard"><font color="white">NumberOfDays</font></Button></h4>
                <h4><Button ClassName="button9" onClick={()=>{navigate("/viewpass")}} variant="standard"><font color="white">PassPercentage</font></Button></h4>
                <h4><Button ClassName="button10" onClick={()=>{navigate("/viewplacements")}} variant="standard"><font color="white">Placements</font></Button></h4>
                </Grid>
                <Grid className="btn-3">
                <h4><Button ClassName="button11" onClick={()=>{setIsDialogOpen(true)}} variant="standard"><font color="white">Value Added</font></Button></h4>
                <h4><Button ClassName="button12" onClick={()=>{navigate("/viewstudent")}} variant="standard"><font color="white">Student Satisfactory</font></Button></h4>

                <h4><Button ClassName="button18" onClick={()=>{navigate("/viewbtech")}} variant="standard"><font color="white">Btech</font></Button></h4>
                <h4><Button ClassName="button19" onClick={()=>{navigate("/viewmtech")}} variant="standard"><font color="white">Mtech</font></Button></h4>
                <h4><Button ClassName="button20" onClick={()=>{navigate("/viewmscormca")}} variant="standard"><font color="white">MSC And MCA</font></Button></h4>
                </Grid>
            </Grid>
            <Dialog sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "800px", 
                        marginLeft:"50px"
                        },
                    },
                }} onClose={handleClose} open={isDialogOpen} >
                <DialogActions>
                <Button onClick={()=>{navigate("/viewvalue1")}} variant="contained"><font color="black">value added year1</font></Button>
                <Button onClick={()=>{navigate("/viewvalue2")}} variant="contained"><font color="black">value added year2</font></Button>
                <Button onClick={()=>{navigate("/viewvalue3")}} variant="contained"><font color="black">value added year3</font></Button>
                <Button onClick={()=>{navigate("/viewvalue4")}} variant="contained"><font color="black">value added year4</font></Button>
                <Button onClick={()=>{navigate("/viewvalue5")}} variant="contained"><font color="black">value added year5</font></Button>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </DialogActions>
            </Dialog>
            <Dialog 
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "400px", 
                            marginLeft:"80px"
                        },
                    },
                }} onClose={handleLogOutClose} open={isLogOutDialogOpen}>
                <DialogContent>
                    <DialogContentText>
                        Do you want to Logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" className="button"  onClick={handleLogOut}>Logout</Button>
                    <Button variant="contained" className="button" onClick={handleLogOutClose}>Stay</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}
export default Home;