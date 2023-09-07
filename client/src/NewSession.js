import { Container, Typography, Grid } from '@mui/material';
import React from 'react';

const NewSession = () => {
  return (
    <Container maxWidth="sm">
      <Grid item xs={12}>
        <br />
        <Typography variant="h4" align="center" gutterBottom>
          New Session
        </Typography>
      </Grid>
    </Container>
  );
};

export default NewSession;
