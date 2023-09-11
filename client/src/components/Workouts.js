import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import useRefreshToken from '../hooks/useRefreshToken';

const Workouts = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const refresh = useRefreshToken();
  const getWorkouts = () => {
    axios
      .get(`/workouts`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.Workouts);
        setWorkouts(res.data.Workouts);
      })
      .catch((error) => console.error(error));
  };

  const deleteWorkout = (workoutId) => {
    axios
      .post(`/workouts/delete-${workoutId}`)
      .then((res) => setWorkouts(res.data.Workouts))
      .catch((error) => console.error(error));
  };
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

  const onEditWorkoutBtn = (workoutId) => {
    console.log('edit ' + workoutId);
    navigate(`/workouts/edit/${workoutId}`);
  };
  const postWorkout = (user, title, exercises) => {
    console.log('PostStam');
    axios
      .post(`/workouts/add-workout`, {
        workout: {
          user: user,
          title: title,
          exercises: exercises,
        },
      })
      .then((res) => {
        setWorkouts(res.data.Workouts);
        navigate('/workouts');
      })
      .catch((err) => console.log(err));
  };

  //for testing.
  const addStamWorkout = () => {
    const stam = {
      title: 'Stam Workout',
      user: 'Nadav Komash',
      lastUpdated: '04/09/2023',
      exercises: [
        { id: '1', title: 'Bench Press', sets: '3', reps: '8' },
        { id: '2', title: 'Lat Pulldown', sets: '3', reps: '10' },
        { id: '3', title: 'Squat', sets: '5', reps: '20' },
        { id: '4', title: 'Lateral Rises', sets: '4', reps: '8' },
      ],
    };
    postWorkout(stam.user, stam.title, stam.exercises);
  };

  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Workouts
      </Typography>

      {workouts.length === 0 ? (
        <Typography variant="body1" align="center">
          No workouts available.
        </Typography>
      ) : (
        <List>
          {workouts.map((workout) => (
            <ListItem key={workout.id} disablePadding>
              <ListItemText primary={workout.title} secondary={workout.user} />
              <Button
                variant="outlined"
                onClick={() => onViewDetailsClicked(workout.id)}
              >
                View Details
              </Button>
              <Button
                color="error"
                onClick={() => onDeleteWorkoutBtn(workout.id)}
              >
                <DeleteIcon></DeleteIcon>
              </Button>
              <Button onClick={() => onEditWorkoutBtn(workout.id)}>
                <EditIcon></EditIcon>
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
      >
        <AddIcon label="add" />
        Add Workout
      </Button>
      <br />
      <Button variant="outlined" color="primary" onClick={() => refresh()}>
        refresh
      </Button>
    </Container>
  );
};

export default Workouts;
