import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import AdminAppointmentPage from "./components/Appointment/AdminAppointmentPage";
import AppointmentDetailPage from "./components/Appointment/AppointmentDetailPage";
import AdminHome from './pages/AdminHome';
import EmployeeManagementPage from './pages/EmployeeManagementPage';

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
          
          </Route>
          {/* Add other top-level routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;