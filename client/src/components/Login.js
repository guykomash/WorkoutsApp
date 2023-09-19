import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { useWorkouts } from '../contexts/WorkoutsProvider';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Paper,
  Button,
} from '@mui/material';
import axios from '../api/axios';

const Login = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { fetchUserWorkouts } = useWorkouts().user;
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

  const handleLoginBtn = async () => {
    if (!user || !pwd) return alert('empty fields');
    // setUser('');
    // setPwd('');
    setIsLoadingRequest(true);
    // Set Auth Context
    try {
      const res = await axios.post(
        `/auth`,
        {
          user: user,
          pwd: pwd,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const accessToken = res?.data?.accessToken;
      const userId = res?.data?.userId;
      const userName = res?.data?.userName;
      const firstName = res?.data?.userFirstName;
      const lastName = res?.data?.userLastName;
      const created = res?.data?.created;

      //set Workouts Context

      setAuth({ userId, userName, firstName, lastName, created, accessToken });
      await fetchUserWorkouts();
      navigate('/');
    } catch (err) {
      if (err?.response?.status !== 403) {
        setIsLoadingRequest(true);
        console.log(err);
      }
    }
  };
  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <br />
      <Button
        size="large"
        sx={{
          color: 'black',
          backgroundColor: 'gold',
          ':hover': {
            color: 'gold',
            backgroundColor: '#333333',
          },
        }}
        fullWidth
        onClick={() => navigate('/register')}
      >
        Not a user? Click here to register!
      </Button>
      <Paper sx={{ p: 2 }}>
        <Grid item xs={12}>
          <TextField
            disabled={isLoadingRequest}
            label="User Name"
            fullWidth
            margin="normal"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            disabled={isLoadingRequest}
            label="Password"
            fullWidth
            margin="normal"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <Button
            disabled={!user || !pwd}
            variant="contained"
            style={{ minWidth: '100%' }}
            onClick={handleLoginBtn}
          >
            Login
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
