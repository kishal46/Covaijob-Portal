import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Staff from './pages/staff.jsx';
import Login from './pages/Login';
import DeveloperHiringForm from './pages/HireDev';
import Home from './pages/Home';
import Signup from './pages/Signup';
import { UserContext } from './Context/AuthContext';
import Dashboard from './Component/Dashboard';
import JobCard from './Component/JobCard';
import PostJobPanel from './Component/PostJobPanel';
import JobApplicationForm from './Component/ApplyForm.jsx';
import Hire from './Hire/Hire.jsx';
import ApplySuccess from './Component/ApplySuccess.jsx';
import HomeSlider from './Home/HomeSlider.jsx';
import Contact from "./Home/Contct.jsx"
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Navbar />      
        <div>
          <Routes>
            <Route path='/' element={<HomeSlider/>}></Route>
            <Route path="/" element={<Home />} />
            <Route path="/staff-augmentation" element={<Staff />} />
            <Route path="/finddev" element={<Hire />} />
            <Route path="/postjob" element={<PostJobPanel />} />
            <Route path="/hiredev" element={<DeveloperHiringForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/currentjobs' element={<JobCard />} />
            <Route path='/apply' element={<JobApplicationForm/>}></Route>
            <Route path="/apply-success" element={<ApplySuccess />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path='/contact' element={<Contact/>}/>
          </Routes>
        </div>  
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
