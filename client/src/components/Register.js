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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const { auth } = useAuth();

  const handleRegisterBtn = () => {
    if (!user || !pwd) return alert('empty fields');
    const onlyLettersAndSpaces = (str) => /^[A-Za-z\s]*$/.test(str);
    if (onlyLettersAndSpaces(firstName) || onlyLettersAndSpaces(lastName))
      alert('names must contain only letters or spaces.');
    axios
      .post(
        `/register`,
        {
          user: user,
          pwd: pwd,
          firstName: firstName,
          lastName: lastName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setHasRegistered(true);
      })
      .catch((err) => console.error(err));
  };

  const formatName = (name) => {
    if (!name || name === '') return name;
    if (name.length == 1) return name.toUpperCase();
    else {
      const names = name.split(' ');
      let formattedName = '';
      for (const n of names) {
        const first = n[0].toUpperCase();
        const rest = n.substring(1).toLowerCase();
        formattedName = `${formattedName}${first}${rest} `;
      }
      return formattedName.split(0, -1)[0];
    }
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
        Welcome to WORKOUTS
      </Typography>
      <br />
      <Paper sx={{ p: 2 }}>
        <Grid item xs={12}>
          {/* <br /> */}
          <Typography variant="h6" align="center" gutterBottom>
            Enter full name
          </Typography>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <br />
          <Typography variant="h6" align="center" gutterBottom>
            Enter user name and password
          </Typography>
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
            disabled={!user || !pwd || !firstName || !lastName}
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
