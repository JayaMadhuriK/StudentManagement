import Button from '@mui/material/Button';
import {Grid} from '@material-ui/core'
import './HomeStudent.scss'
import Home from './HomeStu'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const HomeStudent = () =>{

    return(
            <Grid className="stu">
               <Grid><Home/></Grid>
               <Grid className="slider">
               </Grid>
               <Grid className="slide"></Grid>
               <Grid className="slide1"></Grid>
               <Grid className="slide2"></Grid>
               <Grid className="slide3">

                <h2 className="label">----- Quick Links -----</h2>
                <a href="https://www.andhrauniversity.edu.in/aulooks/aulooks.html"><Button variant="standard" className="btn" color="success"><ArrowCircleRightIcon/>AU Looks</Button></a>
                <a href="https://scholarkart.in/AU/"><Button variant="standard" className="btn1" color="success"><ArrowCircleRightIcon/>AU Library</Button></a>
                <a href="https://www.andhrauniversity.edu.in/student-corner/academic-calendar.html"><Button variant="standard" className="btn2" color="success"><ArrowCircleRightIcon/>Academic Calendar</Button></a>
                <a href="https://www.andhrauniversity.edu.in/about/photo-gallery.html"><Button variant="standard" className="btn3" color="success"><ArrowCircleRightIcon/>AU Photo Gallery</Button></a>
                <a href="https://www.andhrauniversity.edu.in/about/au-profile.html"><Button variant="standard" className="btn4" color="success"><ArrowCircleRightIcon/>About Us</Button></a>

                </Grid>

                <Grid className="slide4">

                <h2 className="label">----- Departments -----</h2>
                <a href="https://www.andhrauniversity.edu.in/college/college-of-engineering/engineering-departments/cse.html"><Button variant="standard" className="btn" color="success"><ArrowCircleRightIcon/>CSE</Button></a>
                <a href="https://www.andhrauniversity.edu.in/college/college-of-engineering/engineering-departments/CSE-IT.html"><Button variant="standard" className="btn1" color="success"><ArrowCircleRightIcon/>IT & CA</Button></a>
                <a href="https://www.andhrauniversity.edu.in/college/college-of-engineering/engineering-facilities.html"><Button variant="standard" className="btn2" color="success"><ArrowCircleRightIcon/>Facilities & Services</Button></a>
                <a href="https://www.andhrauniversity.edu.in/college/college-of-engineering/engineering-courses.html"><Button variant="standard" className="btn3" color="success"><ArrowCircleRightIcon/>Programs Offered</Button></a>

                </Grid>
                <Grid className="slide5">
                    <h2>----- Contact Details -----</h2>
                    <Grid className="con"><EmailIcon className="icon"/><h3>Email : support@andhrauniversity.edu.in</h3></Grid>

                    <Grid className="con"><EmailIcon className="icon"/><h3>Email : enquiry@andhrauniversity.edu.in</h3></Grid>

                    <Grid className="con"><AccessTimeIcon className="icon"/><h3>Office Timings : Mon-Sat : 10:00 AM to 5:00 PM</h3></Grid>

                    <Grid className="con"><PhoneIcon className="icon"/> <h3>Phone:0891 2844000</h3></Grid>

                </Grid>

            </Grid>
    )
}

export default HomeStudent;