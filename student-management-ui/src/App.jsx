import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './components/Login_And_Register/Register'
import Login from './components/Login_And_Register/Login'
import Btech from './components/Login_And_Register/Btech'
import Mtech from './components/Login_And_Register/Mtech'
import MscOrMca from './components/Login_And_Register/MscOrMca'
import Activities from './components/Login_And_Register/Activities'
import Home from './components/Login_And_Register/Home'
import React from 'react';
import AvgNumOfDays from './components/Login_And_Register/AvgNumOfDays';
import AvgPassPercentage from './components/Login_And_Register/AvgPassPercentage';
import Awards from './components/Login_And_Register/Awards';
import CouncilActivity from './components/Login_And_Register/CouncilActivity';
import DemandRatio from './components/Login_And_Register/DemandRatio';
import HigherEdu from './components/Login_And_Register/HigherEdu';
import PerStudentUndertaking from './components/Login_And_Register/PerStudentUndertaking';
import Placements from './components/Login_And_Register/Placements';
import StudentComputer from './components/Login_And_Register/StudentComputer';
import StudentSatisfactory from './components/Login_And_Register/StudentSatisfactory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/btech' element={<Btech/>}/>
              <Route path='/mtech' element={<Mtech/>}/>
              <Route path='/mscormca' element={<MscOrMca/>}/>
              <Route path='/activities' element={<Activities/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='/numberofdays' element={<AvgNumOfDays/>}/>
              <Route path='/passpercentage' element={<AvgPassPercentage/>}/>
              <Route path='/awards' element={<Awards/>}/>
              <Route path='/councilactivity' element={<CouncilActivity/>}/>
              <Route path='/demandratio' element={<DemandRatio/>}/>
              <Route path='/highereducation' element={<HigherEdu/>}/>
              <Route path='/internships' element={<PerStudentUndertaking/>}/>
              <Route path='/placements' element={<Placements/>}/>
              <Route path='/studentcomputerratio' element={<StudentComputer/>}/>
              <Route path='/studentsatisfactory' element={<StudentSatisfactory/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;