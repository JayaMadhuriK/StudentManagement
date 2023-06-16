import Grid from '@material-ui/core/Grid'
import React,{useEffect, useState} from 'react'
import '../Common.scss';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@mui/material/Alert';

const StudentHome = () =>{
    // const [user,setUser] = useState(null);
    // const [editing, setEditing] = useState(false);
    // const [updatedUser, setUpdatedUser] = useState({});
    // const [systemErrors,setSystemErrors] = useState("");
    // const Alert = React.forwardRef(function Alert(props, ref) {
    //     return <MuiAlert ref={ref} variant="filled" {...props} />;
    // });
    // const fetchUser = async() =>{
    //     try{
    //         const response =await axios.get(`http://localhost:6001/api/users/getusers/`);
    //         setUser(response?.data);
    //     }catch(error){
    //         console.log(error);
    //     }
    // };
    // const handleInputChange = (event) => {
    //     setUpdatedUser({
    //       ...updatedUser,
    //       [event.target.name]: event.target.value,
    //     });
    //   };
    // const handleUpdateUser = async () => {
    //     const token = localStorage.getItem("jwtToken");
    //     const headers = {
    //         'Authorization': token,
    //         'Content-Type' : 'application/json'
    //     };
    //     const updatedData = {
    //         firstName: updatedUser.firstName || user.firstName,
    //         lastName: updatedUser.lastName || user.lastName,
    //         email: updatedUser.email || user.email,
    //         dateOfBirth: updatedUser.dateOfBirth || user.dateOfBirth,
    //         age: updatedUser.age || user.age,
    //         mobileNumber: updatedUser.mobileNumber || user.mobileNumber,
    //     };
    //     await axios.put(`http://localhost:6001/api/users/updateusers/${user.userId}`,updatedData,{headers})
    //     .then(response=>{
    //         if(response?.status == 200){
    //             setSystemErrors({...systemErrors,response:'Updated Successfully'});
    //             setTimeout(function() {
    //                 setSystemErrors({...systemErrors,response:''});
    //                 setEditing(false);
    //             }, 2000);
    //             fetchUser();
    //         }
    //         else if(response?.status == 400){
    //             setSystemErrors({...systemErrors,response:'Error'});
    //             setTimeout(function() {
    //                 setSystemErrors({...systemErrors,response:''});
    //             }, 2000);
    //         }
    //     }).catch(error=>{
    //         if(error?.message=="Network Error"){
    //             setSystemErrors({...systemErrors,networkError:error?.message})
    //             setTimeout(function() {
    //                 setSystemErrors({...systemErrors,networkError:''});
    //                 setEditing(false);
    //             }, 2000);
    //         }
    //     });
    // };
    // useEffect(()=>{
    //     fetchUser();
    // },[]);
   return (
        <Grid className="showprofile-body">
            <p>Student</p>
        </Grid>
    );
};

export default StudentHome;