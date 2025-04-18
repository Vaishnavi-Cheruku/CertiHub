import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Welcome';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import StaffLogin from './pages/StaffLogin';
import UserHome from './pages/Home'; // <-- Import the logged-in home page
import StaffHome from './pages/StaffHome';

import Services from './pages/services';
import ServiceDetail from './pages/serviceDetail';
import ApplicationTracking from './pages/ApplicationTracking';
import Complaint from './pages/Complaint';
import Contact from './pages/Contact';

import Dashboard from './pages/Dashboard';
import PendingApplications from './pages/PendingApplications';
import VerifiedApplications from './pages/VerifiedApplications';
import RejectedApplications from './pages/RejectedApplications';
import StaffProfile from './pages/StaffProfile';

import OBCApplicationForm from './pages/OBCApplicationForm';
import IncomeCertificate from './pages/IncomeCertificate';
import ResidenceCertificateForm from './pages/ResidenceCertificateForm';
import BirthDeathForm from './pages/BirthDeathForm';
import Caste  from './pages/Caste';

import { ToastContainer } from 'react-toastify';
import Layout from "./components/Layout";  // For users
import SLayout from "./components/SLayout";  // For staff

// Mock auth check (replace with real logic if needed)
const isAuthenticated = () => {
  return !!localStorage.getItem('userToken');
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};


// Protected Staff Route
// Protected route component for staff
const ProtectedStaffRoute = ({ children }) => {
  const isStaffAuthenticated =
    localStorage.getItem("loginRole") === "staff" &&
    !!localStorage.getItem("staffToken");

  return isStaffAuthenticated ? children : <Navigate to="/staff-login" />;
};


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/forgot-password" element={<ResetPassword userType="user" />} />
        <Route path="/staff-forgot-password" element={<ResetPassword userType="staff" />} />

        {/* Protected User Home route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff-home"
          element={
            <ProtectedStaffRoute>
              <StaffHome />
            </ProtectedStaffRoute>
          }
        />


        {/* Main Pages */}
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/services/:sno" element={<Layout><ServiceDetail /></Layout>} />
        <Route path="/tracking" element={<Layout><ApplicationTracking /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/complaint" element={<Layout><Complaint /></Layout>} />
        
        <Route path="/staff-dashboard" element={<SLayout><Dashboard /></SLayout>} />
        <Route path="/staff-pending" element={<SLayout><PendingApplications /></SLayout>} />
        <Route path="/staff-verified" element={<SLayout><VerifiedApplications /></SLayout>} />
        <Route path="/staff-rejected" element={<SLayout><RejectedApplications /></SLayout>} />
        <Route path="/staff-profile" element={<SLayout><StaffProfile /></SLayout>} />

        {/*Forms*/}
        <Route path="/application-form/37" element={<Layout><OBCApplicationForm /></Layout>} />
        <Route path="/application-form/19" element={<Layout><IncomeCertificate /></Layout>} />
        <Route path="/application-form/45" element={<Layout><ResidenceCertificateForm /></Layout>} />
        <Route path="/application-form/8" element={<Layout><Caste/></Layout>} />
        <Route path="/application-form/26" element={<Layout><BirthDeathForm /></Layout>} />

      </Routes>
    </div>
  );
};

export default App;
