import React, { useState, useEffect } from 'react';
import { Container, Typography, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Navbar from '../components/Navbar';
import axios from 'axios';

const EmployerDashboard = () => {
  const [view, setView] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loginLogs, setLoginLogs] = useState([]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5046/api/employee', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees data', error);
    }
  };

  const fetchLoginLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5046/api/employee/logs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoginLogs(response.data);
    } catch (error) {
      console.error('Error fetching login logs', error);
    }
  };

  useEffect(() => {
    if (view === 'employees') {
      fetchEmployees();
    } else if (view === 'loginLogs') {
      fetchLoginLogs();
    }
  }, [view]);

  return (
    <Container>
      <Navbar role="Employer" />
      <Typography variant="h4" gutterBottom>Employer Dashboard</Typography>
      <Link href="#" onClick={() => setView('employees')}>Show List of Employees</Link>
      <br />
      <Link href="#" onClick={() => setView('loginLogs')}>Show Login Info</Link>

      {view === 'employees' && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Employee Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.employeeID}>
                  <TableCell>{employee.employeeID}</TableCell>
                  <TableCell>{employee.employeeName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {view === 'loginLogs' && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Login Date</TableCell>
                <TableCell>Logout Date</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Employee Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loginLogs.map((log) => (
                <TableRow key={log.logID}>
                  <TableCell>{log.employeeID}</TableCell>
                  <TableCell>{log.loginDate}</TableCell>
                  <TableCell>{log.logoutDate}</TableCell>
                  <TableCell>{log.employeeName}</TableCell>
                  <TableCell>{log.employeeDescription}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default EmployerDashboard;
