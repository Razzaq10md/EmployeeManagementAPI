import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Navbar from '../components/Navbar';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const username = decodedToken.sub;

        const response = await axios.get(`http://localhost:5046/api/employee/username/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data', error);
      }
    };

    fetchEmployee();
  }, []);

  if (!employee) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Navbar role="Employee" />
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            THIS IS {employee.employeeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {employee.employeeDescription}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Age: {employee.employeeAge}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gender: {employee.employeeGender}
          </Typography>
          <CardMedia
            component="img"
            height="140"
            image="data:image/jpeg;base64,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"
            alt="Employee image"
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmployeeDashboard;
