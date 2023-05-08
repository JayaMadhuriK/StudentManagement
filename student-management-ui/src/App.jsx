import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './components/Login_And_Register/Register'
import Login from './components/Login_And_Register/Login'
import Btech from './components/Btech/Btech'
import Mtech from './components/Mtech/Mtech'
import MscOrMca from './components/McaAndMsc/MscOrMca'
import Activities from './components/Activities/Activities'
import ViewActivities from './components/Activities/ViewActivities'
import Home from './components/Home/Home'
import React from 'react';
import AvgNumOfDays from './components/NumOfDays/AvgNumOfDays';
import ViewAvg from './components/NumOfDays/ViewAvg';
import AvgPassPercentage from './components/PassPercentage/AvgPassPercentage';
import Awards from './components/Awards/Awards';
import ViewAwards from './components/Awards/ViewAwards';
import CouncilActivity from './components/CouncilActivity/CouncilActivity';
import ViewCouncil from './components/CouncilActivity/ViewCouncil';
import DemandRatio from './components/DemandRatio/DemandRatio';
import ViewDemand from './components/DemandRatio/ViewDemand';
import HigherEdu from './components/HigherEducation/HigherEdu';
import ViewHigher from './components/HigherEducation/ViewHigher';
import PerStudentUndertaking from './components/Internships/PerStudentUndertaking';
import ViewInternships from './components/Internships/ViewInternships';
import Placements from './components/Placements/Placements';
import ViewPlacements from './components/Placements/ViewPlacements';
import StudentComputer from './components/ComputerRatio/StudentComputer';
import ViewComputer from './components/ComputerRatio/ViewComputer';
import StudentSatisfactory from './components/StudentSatisfactory/StudentSatisfactory';
import ViewStudent from './components/StudentSatisfactory/ViewStudent';
import ValueAddedYr1 from './components/ValueAdded/ValueAddedYr1';
import ValueAddedYr2 from './components/ValueAdded/ValueAddedYr2';
import ValueAddedYr3 from './components/ValueAdded/ValueAddedYr3';
import ValueAddedYr4 from './components/ValueAdded/ValueAddedYr4';
import ValueAddedYr5 from './components/ValueAdded/ValueAddedYr5';
import ViewValue1 from './components/ValueAdded/ViewValue1';
import ViewValue2 from './components/ValueAdded/ViewValue2';
import ViewValue3 from './components/ValueAdded/ViewValue3';
import ViewValue4 from './components/ValueAdded/ViewValue4';
import ViewValue5 from './components/ValueAdded/ViewValue5';
import HomeStu from './components/Home/HomeStu';
import ViewPass from './components/PassPercentage/ViewPass';
import ViewBtech from './components/Btech/ViewBtech'
import ViewMtech from './components/Mtech/ViewMtech'
import ViewMscOrMca from './components/McaAndMsc/ViewMscOrMca'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path='/register' element={<Register/>}/>
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
              <Route path='/' element={<HomeStu/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;