import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import DoctorDashboard from "./Doctor_dashboard";
import PatientDashboard from "./Patientdashboard";
import Register from "./Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<iframe title="Default Template" src="../mico-html/index.html" width="100%" height="1000px" />} />
      <Route path="/register" element={<Register />} />
      
        <Route path="/login" element={<Login />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
