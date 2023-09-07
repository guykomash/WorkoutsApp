import { Container, Grid, Typography } from '@mui/material';
import React from 'react';

const Timer = () => {
  return (
    <Container maxWidth="sm">
      <Grid item xs={12}>
        <br />
        <Typography variant="h4" align="center" gutterBottom>
          Timer
        </Typography>
      </Grid>
    </Container>
  );
};

export default Timer;
