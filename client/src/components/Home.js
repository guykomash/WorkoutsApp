import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Users from './Users';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Grid item xs={12}>
        <br />
        <Typography variant="h4" align="center" gutterBottom>
          Home Page
        </Typography>

        <Users />
      </Grid>
    </Container>
  );
};

export default Home;
