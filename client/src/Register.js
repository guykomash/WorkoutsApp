import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Paper,
  Button,
} from '@mui/material';
import axios from 'axios';
const Register = () => {
  // axios.defaults.withCredentials = true;
  const baseURL = 'http://localhost:3080';
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');

  const handleRegisterBtn = () => {
    if (!userName || !pwd) return alert('empty fields');
    axios
      .post(`${baseURL}/register`, {
        user: userName,
        pwd: pwd,
      })
      .then((res) => {
        console.log(res);
        setUserName('');
        setPwd('');
      })
      .catch((err) => console.error(err));
  };
  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Grid item xs={12}>
          <TextField
            label="User Name"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ minWidth: '100%' }}
            onClick={handleRegisterBtn}
          >
            Register
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register;
