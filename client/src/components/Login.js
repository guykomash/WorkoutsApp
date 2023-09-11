import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
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
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLoginBtn = async () => {
    if (!user || !pwd) return alert('empty fields');
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
      console.log(res?.data);
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Login
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
            disabled={!user || !pwd}
            variant="contained"
            style={{ minWidth: '100%' }}
            onClick={handleLoginBtn}
          >
            Login
          </Button>
        </Grid>
      </Paper>
      <br />
      <Button fullWidth onClick={() => navigate('/register')}>
        Not a user? Click here to register!
      </Button>
    </Container>
  );
};

export default Login;
