import useAxiosPrivate from '../hooks/useAxiosPrivate';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Paper,
  // TextField,
  Typography,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';

const WorkoutDetails = () => {
  const axiosPrivate = useAxiosPrivate();

  const { workoutId } = useParams();
  const navigate = useNavigate();

  const onWorkoutsBtn = () => {
    navigate(-1);
  };

  const [workout, setWorkout] = useState(null);

  const getWorkout = () => {
    axiosPrivate
      .get(`/workouts/${workoutId}`)
      .then((res) => {
        setWorkout(res.data.workout);
      })

      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getWorkout();
  }, []);

  const renderExercises = (exercises) => {
    if (!exercises) return;
    return exercises.length === 0 ? (
      'No exercises'
    ) : (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Exercise</TableCell>
              <TableCell align="right">Sets</TableCell>
              <TableCell align="right">Reps</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exercises.map((exercise) => (
              <TableRow
                key={`exercise-${exercise._id}-row`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell key={`exercise-${exercise._id}-title`}>
                  {exercise.title}
                </TableCell>
                <TableCell key={`exercise-${exercise._id}-sets`} align="right">
                  {exercise.sets}
                </TableCell>
                <TableCell key={`exercise-${exercise._id}-reps`} align="right">
                  {exercise.reps}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Workout Details
      </Typography>
      {workout ? (
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6"></Typography>
              <Typography variant="h5" align="center">
                {workout.title}
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <Typography display={'inline'} variant="body1">
                Created by
              </Typography>
              <Typography
                display={'inline'}
                padding={0.5}
                variant="body1"
                sx={{ fontStyle: 'italic', color: 'green' }}
              >
                {`${workout.author.firstname} ${workout.author.lastname}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6"></Typography>
            <List variant="body1">{renderExercises(workout.exercises)}</List>
          </Grid>
          <Grid
            item
            xs={12}
            align="left"
            sx={{ fontStyle: 'italic', fontSize: 14, color: 'blue' }}
          >
            <Typography display={'inline'} variant="body2">
              Last Updated
            </Typography>
            <Typography display={'inline'} variant="body2" padding={0.5}>
              {workout.lastUpdated}
            </Typography>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="body1" align="center">
          Loading workout details...
        </Typography>
      )}
      <br />
      <Button
        style={{ minWidth: '100%' }}
        variant="contained"
        color="primary"
        onClick={onWorkoutsBtn}
      >
        go Back
      </Button>
    </Container>
  );
};

export default WorkoutDetails;
