import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

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
