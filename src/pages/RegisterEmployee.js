import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Navbar';

const RegisterEmployee = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeDescription, setEmployeeDescription] = useState('');
  const [employeeAge, setEmployeeAge] = useState('');
  const [employeeGender, setEmployeeGender] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5046/api/employee', {
        employeeName,
        employeeDescription,
        employeeAge,
        employeeGender,
        role: 'Employee'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Employee registered successfully!');
    } catch (error) {
      console.error('Error registering employee', error);
    }
  };

  const handleClear = () => {
    setEmployeeName('');
    setEmployeeDescription('');
    setEmployeeAge('');
    setEmployeeGender('');
  };

  return (
    <Container>
      <Navbar role="Employer" />
      <Typography variant="h4" gutterBottom>Register Employee</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Employee Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
        <TextField
          label="Employee Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employeeDescription}
          onChange={(e) => setEmployeeDescription(e.target.value)}
        />
        <TextField
          label="Employee Age"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employeeAge}
          onChange={(e) => setEmployeeAge(e.target.value)}
        />
        <TextField
          label="Employee Gender"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employeeGender}
          onChange={(e) => setEmployeeGender(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Save</Button>
        <Button type="button" variant="contained" onClick={handleClear}>Clear</Button>
      </form>
    </Container>
  );
};

export default RegisterEmployee;
