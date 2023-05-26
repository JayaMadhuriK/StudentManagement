import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AdminRegister from './Components/Login_And_Register/AdminRegister'
import StudentRegister from './Components/Login_And_Register/StudentRegister'

import Login from './Components/Login_And_Register/Login'
import Btech from './Components/Btech/Btech'
import Mtech from './Components/Mtech/Mtech'
import MscOrMca from './Components/McaAndMsc/MscOrMca'
import Activities from './Components/Activities/Activities'
import ViewActivities from './Components/Activities/ViewActivities'
import Home from './Components/Home/Home'
import React from 'react';
import AvgNumOfDays from './Components/NumOfDays/AvgNumOfDays';
import ViewAvg from './Components/NumOfDays/ViewAvg';
import AvgPassPercentage from './Components/PassPercentage/AvgPassPercentage';
import Awards from './Components/Awards/Awards';
import ViewAwards from './Components/Awards/ViewAwards';
import CouncilActivity from './Components/CouncilActivity/CouncilActivity';
import ViewCouncil from './Components/CouncilActivity/ViewCouncil';
import DemandRatio from './Components/DemandRatio/DemandRatio';
import ViewDemand from './Components/DemandRatio/ViewDemand';
import HigherEdu from './Components/HigherEducation/HigherEdu';
import ViewHigher from './Components/HigherEducation/ViewHigher';
import PerStudentUndertaking from './Components/Internships/PerStudentUndertaking';
import ViewInternships from './Components/Internships/ViewInternships';
import Placements from './Components/Placements/Placements';
import ViewPlacements from './Components/Placements/ViewPlacements';
import StudentComputer from './Components/ComputerRatio/StudentComputer';
import ViewComputer from './Components/ComputerRatio/ViewComputer';
import StudentSatisfactory from './Components/StudentSatisfactory/StudentSatisfactory';
import ViewStudent from './Components/StudentSatisfactory/ViewStudent';
import ValueAddedYr1 from './Components/ValueAdded/ValueAddedYr1';
import ValueAddedYr2 from './Components/ValueAdded/ValueAddedYr2';
import ValueAddedYr3 from './Components/ValueAdded/ValueAddedYr3';
import ValueAddedYr4 from './Components/ValueAdded/ValueAddedYr4';
import ValueAddedYr5 from './Components/ValueAdded/ValueAddedYr5';
import ViewValue1 from './Components/ValueAdded/ViewValue1';
import ViewValue2 from './Components/ValueAdded/ViewValue2';
import ViewValue3 from './Components/ValueAdded/ViewValue3';
import ViewValue4 from './Components/ValueAdded/ViewValue4';
import ViewValue5 from './Components/ValueAdded/ViewValue5';
import HomeStudent from './Components/Home/HomeStudent';
import ViewPass from './Components/PassPercentage/ViewPass';
import ViewBtech from './Components/Btech/ViewBtech'
import ViewMtech from './Components/Mtech/ViewMtech'
import ViewMscOrMca from './Components/McaAndMsc/ViewMscOrMca'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
             <Route path='/adminregister' element={<AdminRegister/>}/>
             <Route path='/studentregister' element={<StudentRegister/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/btech' element={<Btech/>}/>
              <Route path='/viewbtech' element={<ViewBtech/>}/>
              <Route path='/mtech' element={<Mtech/>}/>
              <Route path='/viewmtech' element={<ViewMtech/>}/>
              <Route path='/mscormca' element={<MscOrMca/>}/>
              <Route path='/viewmscormca' element={<ViewMscOrMca/>}/>
              <Route path='/activities' element={<Activities/>}/>
              <Route path='/viewactivities' element={<ViewActivities/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/numberofdays' element={<AvgNumOfDays/>}/>
              <Route path='/viewavg' element={<ViewAvg/>}/>
              <Route path='/passpercentage' element={<AvgPassPercentage/>}/>
              <Route path='/viewpass' element={<ViewPass/>}/>
              <Route path='/awards' element={<Awards/>}/>
              <Route path='/viewawards' element={<ViewAwards/>}/>
              <Route path='/councilactivity' element={<CouncilActivity/>}/>
              <Route path='/viewcouncil' element={<ViewCouncil/>}/>
              <Route path='/demandratio' element={<DemandRatio/>}/>
              <Route path='/viewdemand' element={<ViewDemand/>}/>
              <Route path='/highereducation' element={<HigherEdu/>}/>
              <Route path='/viewhigher' element={<ViewHigher/>}/>
              <Route path='/internships' element={<PerStudentUndertaking/>}/>
              <Route path='/viewinternships' element={<ViewInternships/>}/>
              <Route path='/placements' element={<Placements/>}/>
              <Route path='/viewplacements' element={<ViewPlacements/>}/> 
              <Route path='/studentcomputerratio' element={<StudentComputer/>}/>
              <Route path='/viewcomputers' element={<ViewComputer/>}/>
              <Route path='/studentsatisfactory' element={<StudentSatisfactory/>}/>
              <Route path='/viewStudent' element={<ViewStudent/>}/>
              <Route path='/valueaddedyr1' element={<ValueAddedYr1/>}/>
              <Route path='/valueaddedyr2' element={<ValueAddedYr2/>}/>
              <Route path='/valueaddedyr3' element={<ValueAddedYr3/>}/>
              <Route path='/valueaddedyr4' element={<ValueAddedYr4/>}/>
              <Route path='/valueaddedyr5' element={<ValueAddedYr5/>}/>
              <Route path='/viewvalue1' element={<ViewValue1/>}/>
              <Route path='/viewvalue2' element={<ViewValue2/>}/>
              <Route path='/viewvalue3' element={<ViewValue3/>}/>
              <Route path='/viewvalue4' element={<ViewValue4/>}/>
              <Route path='/viewvalue5' element={<ViewValue5/>}/> 
              <Route path='/' element={<HomeStudent/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;