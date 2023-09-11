import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <br />
      {/* <Typography variant="h4" align="center" gutterBottom>
        Welcome
      </Typography> */}
      <br />
      <Typography variant="h6" align="center" gutterBottom>
        Welcome to WORKOUTS! <br /> Please log in to use the app.
      </Typography>
    </Container>
  );
};

export default Welcome;
