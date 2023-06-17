import React,{useState} from 'react';
import HomeStudent from './Home/HomeStudent';
import StudentHome from './Home/StudentHome';
import Login from './Login_And_Register/Login';

const Main = () =>{
    const [renderComponent,setRenderComponent] = useState("home");
    const [userDetails,setUserDetails] = useState({});
    const renderPage = () => {
    switch (renderComponent) {
      case 'home':
        return <HomeStudent setRenderComponent={setRenderComponent}/>;
      case 'login':
        return <Login setRenderComponent={setRenderComponent} setUserDetails={setUserDetails}/>;
      case 'student':
        return <StudentHome setRenderComponent={setRenderComponent} userDetails={userDetails}/>;
      default:
        return null;
    }
    };
    return(
        <>
            {renderPage()}
        </>
    )
};

export default Main;