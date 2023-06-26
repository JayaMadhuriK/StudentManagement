import Grid from '@material-ui/core/Grid'
import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@mui/material/Alert';
import {useLocation} from 'react-router-dom' 

const StudentHome = () =>{
    const location = useLocation();
    const userDetails = location?.state?.studentDetails;
    const [user,setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const [systemErrors,setSystemErrors] = useState("");
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert ref={ref} variant="filled" {...props} />;
    });
    const fetchUser = async() =>{
        try{
            const response =await axios.get(`http://localhost:4000/btech/email/${userDetails.Admin_EmailID}`);
            setUser(response?.data);
            console.log(response)
        }catch(error){
            console.log(error);
            console.log(userDetails.Admin_EmailID);
        }
    };
    console.log(user)
    const handleInputChange = (event) => {
        setUpdatedUser({
          ...updatedUser,
          [event.target.name]: event.target.value,
        });
      };
    const handleUpdateUser = async () => {
        const updatedData = {
            First_Name: updatedUser.First_Name || user.First_Name,
            Last_Name: updatedUser.Last_Name || user.Last_Name,
            Email_ID: updatedUser.Email_ID || user.Email_ID,
            DOB: updatedUser.DOB || user.DOB,
            Phone_Number: updatedUser.Phone_Number || user.Phone_Number,
            ADHAR_Number: updatedUser.ADHAR_Number || user.ADHAR_Number,
        };
        console.log(updatedData,"updated data")
        await axios.put(`http://localhost:4000/btech/${user.University_RollNumber}`,updatedData)
        .then(response=>{
            if(response?.status == 200){
                setSystemErrors({...systemErrors,response:'Updated Successfully'});
                setTimeout(function() {
                    setSystemErrors({...systemErrors,response:''});
                    setEditing(false);
                }, 2000);
                fetchUser();
            }
            else if(response?.status == 400){
                setSystemErrors({...systemErrors,response:'Error'});
                setTimeout(function() {
                    setSystemErrors({...systemErrors,response:''});
                }, 2000);
            }
        }).catch(error=>{
            if(error?.message=="Network Error"){
                setSystemErrors({...systemErrors,networkError:error?.message})
                setTimeout(function() {
                    setSystemErrors({...systemErrors,networkError:''});
                    setEditing(false);
                }, 2000);
            }
        });
    };
    useEffect(()=>{
        fetchUser();
    },[]);
   return (
        <Grid className="showprofile-body1">
            {systemErrors?.networkError?.length>0 && <Alert severity="error" style={{width:'400px', position:"absolute", marginLeft:'920px', marginTop:'140px'}}>{systemErrors?.networkError}</Alert>}   
            {systemErrors?.response?.length>0 && <Alert severity="success" style={{width:'400px', position:"absolute", marginLeft:'920px', marginTop:'140px'}}>{systemErrors?.response}</Alert>} 
            {user ?(
                <Grid className="all">
                    <Grid className='heading'>
                        <h2 className='studentprofile'>Account Profile</h2>
                        <Grid className="divider">
                            <hr/>
                        </Grid>
                        <img src="https://cdn-icons-png.flaticon.com/512/16/16363.png" className='image1' style={{height:"100px",width:"100px"}}/>
                    </Grid>
                    <Grid className="grid-container1">
                        <h3 className="name">University_RollNumber :- <span style={{marginLeft:"137px",color:"grey"}}>{user.University_RollNumber}</span></h3>
                        {!editing? (
                            <>
                                <h3 className="name">FirstName :-<span style={{marginLeft:"70px",color:"grey"}}>{user.First_Name}</span></h3>
                                <h3 className="name">LastName :- <span style={{marginLeft:"69px",color:"grey"}}>{user.Last_Name}</span></h3> 
                                <h3 className="name">EMAIL :- <span style={{marginLeft:"101px",color:"grey"}}>{user.Email_ID}</span></h3>
                                <h3 className="name">DATE OF BIRTH :- <span style={{marginLeft:"23px",color:"grey"}}>{user.DOB}</span></h3>
                                <h3 className="name">ADHAR_Number :- <span style={{marginLeft:"124px",color:"grey"}}>{user.ADHAR_Number}</span></h3>
                                <h3 className="name">Phone_Number :- <span style={{marginLeft:"21px",color:"grey"}}>{user.Phone_Number}</span></h3>
                                <Button variant="contained" size="medium" className="button" onClick={() => setEditing(true)}>Update</Button>
                            </>
                        ):(
                            <>
                                <h3 className="name">FirstName :-
                                <TextField
                                style={{marginLeft:"70px",marginTop:"-8px",color:"grey"}}
                                type="text"
                                name="First_Name"
                                placeholder="First Name"
                                value={updatedUser.First_Name || user.First_Name}
                                onChange={handleInputChange}
                                /></h3>
                                <h3 className="name">LastName :-
                                <TextField
                                style={{marginLeft:"72px",marginTop:"-8px",color:"grey"}}
                                type="text"
                                name="Last_Name"
                                placeholder="Last Name"
                                value={updatedUser.Last_Name || user.Last_Name}
                                onChange={handleInputChange}
                                /></h3>
                                <h3 className="name">Email_ID :-<span style={{marginLeft:"109px",color:"grey"}}>{user.Email_ID}</span></h3>
                                <h3 className="name">Date Of Birth :-
                                <TextField
                                style={{marginLeft:"41px",marginTop:"-8px",color:"grey"}}
                                type="date"
                                name="DOB"
                                placeholder="Date Of birth"
                                value={updatedUser.DOB || user.DOB}
                                onChange={handleInputChange}
                                /></h3>
                                <h3 className="name">CertificateUpload :-
                                <TextField
                                style={{marginLeft:"124px",marginTop:"-8px", color:"grey"}}
                                type="text"
                                name="ADHAR_Number"
                                placeholder="upload"
                                value={updatedUser.ADHAR_Number || user.ADHAR_Number}
                                onChange={handleInputChange}
                                /></h3>
                                <h3 className="name"> Mobile Number:-
                                <TextField
                                style={{marginLeft:"23px",marginTop:"-8px",color:"grey"}}
                                type="text"
                                name="Phone_Number"
                                placeholder="Mobile Number"
                                value={updatedUser.Phone_Number || user.Phone_Number}
                                onChange={handleInputChange}
                                /></h3>
                                <Button size="medium" variant="contained" className="button" onClick={handleUpdateUser}>Save</Button>
                            </>
                        )}
                    </Grid>
                </Grid>
                ):(
                    <p align="center">Loading user profile ....</p>
            )}
        </Grid>
    );
};

export default StudentHome;