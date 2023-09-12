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
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

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
        setHasRegistered(true);
      })
      .catch((err) => console.error(err));
  };
  return hasRegistered ? (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Registered successfuly!
      </Typography>
      <br />
      <Button
        fullWidth
        onClick={() => {
          navigate('/login');
        }}
      >
        CLICK HERE TO LOG IN!
      </Button>
    </Container>
  ) : (
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
