import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import { useExercises } from '../contexts/ExercisesProvider';
import ExerciseCreateOptionDialog from './ExerciseCreateOptionDialog';

const Home = () => {
  // const { exercises, addExercise } = useExercises();

  // const exercise = {
  //   title: 'Deadlift',
  //   type: 'strength',
  // };

  return (
    <Container maxWidth="sm">
      <Grid item xs={12}>
        <br />
        <Typography variant="h4" align="center" gutterBottom>
          Home Page
        </Typography>
        <br />
        <br />
        <br />
        {/* <ExerciseCreateOptionDialog /> */}
      </Grid>
    </Container>
  );
};

export default Home;
