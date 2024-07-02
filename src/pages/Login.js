import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5046/api/auth/login', { username, password });
      console.log('Response:', response);

      if (response.status === 200) {
        const { token } = response.data;
        console.log('Login successful, token:', token);
        alert('Login successful');

        // Store token in localStorage
        localStorage.setItem('token', token);

        // Decode token to extract user role
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded Token:', decodedToken);

        const role = decodedToken.role;
        console.log('User Role:', role);

        // Navigate based on user role
        if (role === 'Employee') navigate('/employee');
        else if (role === 'Employer') navigate('/employer');
        else if (role === 'Admin') navigate('/admin');
        else navigate('/'); // Default fallback
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login failed', error.response ? error.response.data : error.message);
      alert(`Login failed: ${error.response ? error.response.data.title : error.message}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
