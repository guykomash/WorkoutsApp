import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Workouts = () => {
  axios.defaults.withCredentials = true;
  const baseURL = 'http://localhost:3080';
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);

  const getWorkouts = () => {
    axios
      .get(`${baseURL}/workouts`)
      .then((res) => setWorkouts(res.data.Workouts))
      .catch((error) => console.error(error));
  };

  const deleteWorkout = (workoutId) => {
    axios
      .post(`${baseURL}/workouts/delete-${workoutId}`)
      .then((res) => console.log(res.data.Workouts))
      .catch((error) => console.error(error));
  };

  // const deleteTest = () => {
  //   console.log('delete test');
  //   axios
  //     .delete(`${baseURL}/workouts`)
  //     .then()
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    getWorkouts();
  }, []);

  const onViewDetailsClicked = (workoutId) => {
    navigate(`/workouts/${workoutId}`);
  };

  const onAddWorkoutsBtn = () => {
    navigate('/workouts/add-workout');
  };

  const onDeleteWorkoutBtn = (workoutId) => {
    deleteWorkout(workoutId);
  };

  const postWorkout = (user, title, exercises) => {
    axios
      .post(
        `${baseURL}/workouts/add-workout`,
        {
          workout: {
            user: user,
            title: title,
            exercises: exercises,
          },
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => setWorkouts(res.data.Workouts))
      .catch((err) => console.log(err));
  };

  //for testing.
  const addStamWorkout = () => {
    const stam = {
      title: 'Stam Workout',
      user: 'Nadav Komash',
      lastUpdated: '04/09/2023',
      exercises: [
        { title: 'Bench Press', sets: '3', reps: '8' },
        { title: 'Lat Pulldown', sets: '3', reps: '10' },
        { title: 'Squat', sets: '5', reps: '20' },
        { title: 'Lateral Rises', sets: '4', reps: '8' },
      ],
    };
    postWorkout(stam.user, stam.title, stam.exercises);
    navigate('/workouts');
  };

  return (
    <Container maxWidth="sm">
      <br />
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        data-testid="bookListing-title"
      >
        Workouts
      </Typography>

      {workouts.length == 0 ? (
        <Typography
          variant="body1"
          align="center"
          data-testid="Workouts-noWorkoutsAvailable"
        >
          No workouts available.
        </Typography>
      ) : (
        <List data-testid={'Workouts-list'}>
          {workouts.map((workout) => (
            <ListItem key={workout.id} disablePadding>
              <ListItemText
                primary={workout.title}
                secondary={workout.user}
                data-testid={`Workouts-workout-${workout.id}`}
              />
              <Button
                variant="outlined"
                onClick={() => onViewDetailsClicked(workout.id)}
                data-testid={`Workouts-viewDetailsBtn-${workout.id}`}
              >
                View Details
              </Button>
              <Button
                color="error"
                onClick={() => onDeleteWorkoutBtn(workout.id)}
              >
                <DeleteIcon></DeleteIcon>
              </Button>
            </ListItem>
          ))}
        </List>
      )}
      <Button onClick={() => addStamWorkout()}>Add stam workouts</Button>
      <Button
        style={{ minWidth: '100%' }}
        variant="outlined"
        color="primary"
        sx={{
          color: 'green',
          '&:hover': {
            backgroundColor: 'green',
            color: 'white',
          },
        }}
        onClick={onAddWorkoutsBtn}
        data-testid="filters-WorkoutsBtn"
      >
        <AddIcon label="add" />
        Add Workout
      </Button>
    </Container>
  );
};

export default Workouts;
