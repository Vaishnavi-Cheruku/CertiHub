import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Welcome';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import StaffLogin from './pages/StaffLogin';
import UserHome from './pages/Home'; // <-- Import the logged-in home page

import Services from './pages/services';
import ServiceDetail from './pages/serviceDetail';
import ApplicationTracking from './pages/ApplicationTracking';
import Complaint from './pages/Complaint';
import Contact from './pages/Contact';

import OBCApplicationForm from './pages/OBCApplicationForm';
import IncomeCertificate from './pages/IncomeCertificate';
import ResidenceCertificateForm from './pages/ResidenceCertificateForm';
import BirthDeathForm from './pages/BirthDeathForm';
import Caste  from './pages/Caste';



import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';

// Mock auth check (replace with real logic if needed)
const isAuthenticated = () => {
  return !!localStorage.getItem('userToken');
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
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

        {/* Main Pages */}
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/services/:sno" element={<Layout><ServiceDetail /></Layout>} />
        <Route path="/tracking" element={<Layout><ApplicationTracking /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/complaint" element={<Layout><Complaint /></Layout>} />

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
