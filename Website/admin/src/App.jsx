import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import AdminAppointmentPage from "./components/Appointment/AdminAppointmentPage";
import AppointmentDetailPage from "./components/Appointment/AppointmentDetailPage";
import AdminHome from './pages/AdminHome';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import AdminServicesDashboard from './pages/AdminServicesDashboard';
import BlogManagement from './pages/BlogManagement';
import ContactManagement from './pages/ContactManagement';
import EventManagement from './pages/EventManagement';


import ContactDetail from './pages/ContactDetail';
import LoginPage from './pages/loginPage';
import LeadManagement from './pages/LeadManagement';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="text-white">Loading...</div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <Navigation />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="ui/home" replace />} />
        <Route path="ui/home" element={<AdminHome/>} />
        <Route path="admin-appointment" element={<AdminAppointmentPage />} />
        <Route path="admin-appointment/:id" element={<AppointmentDetailPage />} />
        <Route path="employee-management" element={<EmployeeManagementPage />} />
        <Route path="contact-management" element={<ContactManagement />} />
        <Route path="contact-management/:id" element={<ContactDetail />} />
        <Route path="service-management" element={<AdminServicesDashboard />} />
        <Route path="blogs-management" element={<BlogManagement />} />
        <Route path="event-management" element={<EventManagement />} />
        <Route path="event-leads" element={<LeadManagement />} />
      </Route>
      
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;