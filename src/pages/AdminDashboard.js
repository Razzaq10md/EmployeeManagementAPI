import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Navbar from '../components/Navbar';
import axios from 'axios';

const AdminDashboard = () => {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5046/api/employee/employers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmployers(response.data);
      } catch (error) {
        console.error('Error fetching employers data', error);
      }
    };

    fetchEmployers();
  }, []);

  return (
    <Container>
      <Navbar role="Admin" />
      <Typography variant="h4" gutterBottom>Admin View</Typography>
      <Typography variant="h6" gutterBottom>List of Employers</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employer ID</TableCell>
              <TableCell>Employer Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employers.map((employer) => (
              <TableRow key={employer.employeeID}>
                <TableCell>{employer.employeeID}</TableCell>
                <TableCell>{employer.employeeName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;
