import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Paper,
  Button,
} from '@mui/material';

import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const { auth } = useAuth();

  const handleRegisterBtn = () => {
    if (!user || !pwd) return alert('empty fields');
    axios
      .post(
        `/register`,
        {
          user: user,
          pwd: pwd,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res);
        setUser('');
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
      <div>accessToken = {auth.accessToken}</div>
      <Paper sx={{ p: 2 }}>
        <Grid item xs={12}>
          <TextField
            label="User Name"
            fullWidth
            margin="normal"
            value={user}
            onChange={(e) => setUser(e.target.value)}
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
            disabled={!user || !pwd}
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
