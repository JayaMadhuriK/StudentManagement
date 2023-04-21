import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './components/Login_And_Register/Register'
import Login from './components/Login_And_Register/Login'
import Btech from './components/Btech/Btech'
import Mtech from './components/Mtech/Mtech'
import MscOrMca from './components/McaAndMsc/MscOrMca'
import Activities from './components/Activities/Activities'
import Home from './components/Home/Home'
import React from 'react';
import AvgNumOfDays from './components/NumOfDays/AvgNumOfDays';
import AvgPassPercentage from './components/PassPercentage/AvgPassPercentage';
import Awards from './components/Awards/Awards';
import CouncilActivity from './components/CouncilActivity/CouncilActivity';
import DemandRatio from './components/DemandRatio/DemandRatio';
import HigherEdu from './components/HigherEducation/HigherEdu';
import PerStudentUndertaking from './components/Internships/PerStudentUndertaking';
import Placements from './components/Placements/Placements';
import StudentComputer from './components/ComputerRatio/StudentComputer';
import StudentSatisfactory from './components/StudentSatisfactory/StudentSatisfactory';
import ViewStudent from './components/StudentSatisfactory/ViewStudent';
import ValueAddedYr1 from './components/ValueAdded/ValueAddedYr1';
import ValueAddedYr2 from './components/ValueAdded/ValueAddedYr2';
import ValueAddedYr3 from './components/ValueAdded/ValueAddedYr3';
import ValueAddedYr4 from './components/ValueAdded/ValueAddedYr4';
import ValueAddedYr5 from './components/ValueAdded/ValueAddedYr5';
// import Edit from './components/StudentSatisfactory/Edit';
import HomeStu from './components/Home/HomeStu';

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
              <Route path='/home' element={<Home/>}/>
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
              <Route path='/viewStudent' element={<ViewStudent/>}/>
              <Route path='/valueaddedyr1' element={<ValueAddedYr1/>}/>
              <Route path='/valueaddedyr2' element={<ValueAddedYr2/>}/>
              <Route path='/valueaddedyr3' element={<ValueAddedYr3/>}/>
              <Route path='/valueaddedyr4' element={<ValueAddedYr4/>}/>
              <Route path='/valueaddedyr5' element={<ValueAddedYr5/>}/>
              {/* <Route path='/edit' element={<Edit/>}/> */}
              <Route path='/' element={<HomeStu/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;