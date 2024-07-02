import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RegisterEmployee from './pages/RegisterEmployee';
import TestApi from './TestApi';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/employer" element={<EmployerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/register" element={<RegisterEmployee />} />
      <Route path="/test" element={<TestApi />} />
      <Route path="/" element={<Login />} /> {/* Default route set to Login */}
    </Routes>
  );
}

export default App;