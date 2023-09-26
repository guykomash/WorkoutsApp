import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sessions = () => {
  const navigate = useNavigate();
  const handleNewSessionBtn = () => {
    navigate('/sessions/new-session');
  };

  return (
    <Container maxWidth="sm">
      <br />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: '#097969',
            fontWeight: '600',
            align: 'center',
            width: '300px',
            borderRadius: '6px',
          }}
        >
          Sessions
        </Typography>
        <br />
        <Button onClick={handleNewSessionBtn}>Start New Session!</Button>
      </Container>
    </Container>
  );
};

export default Sessions;
