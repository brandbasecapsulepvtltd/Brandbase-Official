import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import AppointmentsTable from './components/Appointment/AppointmentsTable';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Navigation />}>
            <Route path="appointments" element={<AppointmentsTable />} />
            {/* Add other nested routes here */}
          </Route>
          {/* Add other top-level routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;