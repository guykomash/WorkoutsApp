import React from 'react';
import { Container, Grid, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Grid item xs={12}>
        <br />
        <Typography variant="h4" align="center" gutterBottom>
          Home Page
        </Typography>
      </Grid>
    </Container>
  );
};

export default Home;
