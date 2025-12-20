import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import AdminAppointmentPage from "./components/Appointment/AdminAppointmentPage";
import AppointmentDetailPage from "./components/Appointment/AppointmentDetailPage";
import AdminHome from './pages/AdminHome';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import AdminServicesDashboard from './pages/AdminServicesDashboard';
import BlogManagement from './pages/BlogManagement';
import { FullScreenSignup } from './pages/FullScreenSignup';
import ContactManagement from './pages/ContactManagement';
import ContactDetail from './pages/ContactDetail'; // Import the new component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin/dashboard" element={<Navigation />}>
            <Route path="ui/home" element={<AdminHome/>} />
            <Route path="admin-appointment" element={<AdminAppointmentPage />} />
            <Route path="admin-appointment/:id" element={<AppointmentDetailPage />} />
            {/* Add other nested routes here */}

            <Route path="employee-management" element={<EmployeeManagementPage />} />

            <Route path="contact-management" element={<ContactManagement />} />
            {/* Add contact detail route */}
            <Route path="contact-management/:id" element={<ContactDetail />} />

            <Route path="service-management" element={<AdminServicesDashboard />} />

            <Route path="blogs-management" element={<BlogManagement />} />
          
          </Route>
          {/* Add other top-level routes here */}
          <Route path="/admin/login" element={<FullScreenSignup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;