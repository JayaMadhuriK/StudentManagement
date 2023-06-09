import logo from '../logo.jpg'
import {Grid} from '@material-ui/core'
import './Home.scss'
import Button from '@mui/material/Button';
import { FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const HomeStu = () =>{
    const navigate = useNavigate();
    const handleBtech = () =>{
        navigate("/btech");
    }
    const handleMtech = () =>{
        navigate("/mtech");
    }
    const handleMscORMca= () =>{
        navigate("/mscormca");
    }
    return(
        <Grid className="home-grid1">
            <img src={logo} className="register-logo" alt="logo" />
            <FormLabel className="au">AU</FormLabel>
            <Button variant="standard" className="button" onClick={()=>{navigate("/login")}} color="success" >Login</Button>
            <Button variant="standard" color="success" className="home-btn" onClick={()=>{navigate('/')}}><Home/></Button>
            <Button variant="standard" color="success" className="btech" onClick={handleBtech}>BTECH</Button>
            <Button variant="standard" color="success" className="mtech" onClick={handleMtech}>MTECH</Button>
            <Button variant="standard" color="success" className="mscormca" onClick={handleMscORMca}>MSC / MCA</Button>
            <Button variant="standard" color="success" className="mscormca" onClick={()=>{navigate('/studentsatisfactory')}}>Survey</Button>
        </Grid>
    )
}

export default HomeStu;