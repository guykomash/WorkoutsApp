import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import { useExercises } from '../contexts/ExercisesProvider';

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
        {/* <br />
        <br />
        <Button onClick={() => addExercise(exercise.title, exercise.type)}>
          Post Deadlift exercise
        </Button>
        {!exercises ? (
          <Typography>Loading exercises</Typography>
        ) : exercises.length === 0 ? (
          <Typography>no exercises found.</Typography>
        ) : (
          exercises.map((e, i) => (
            <>
              <Typography key={`${e.title}-${e.type}-${i}`}>
                {e.title}
              </Typography>
              <Typography>{e.type}</Typography>
            </>
          ))
        )} */}
      </Grid>
    </Container>
  );
};

export default Home;
