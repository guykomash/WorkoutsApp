import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Paper,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setAccessToken }) => {
  // axios.defaults.withCredentials = true;
  const baseURL = 'http://localhost:3080';
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const handleLoginBtn = () => {
    if (!userName || !pwd) return alert('empty fields');
    axios
      .post(`${baseURL}/auth`, {
        user: userName,
        pwd: pwd,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        console.log(res.data.accessToken);
        setUserName('');
        setPwd('');
      })
      .catch((err) => console.error(err));
  };
  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Login
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
