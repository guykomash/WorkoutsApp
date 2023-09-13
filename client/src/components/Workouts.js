import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
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
  const [workouts, setWorkouts] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const getWorkouts = () => {
    axiosPrivate
      .get(`/workouts`)
      .then((res) => {
        setWorkouts(res.data.Workouts);
      })
      .catch((error) => console.error(error));
  };

  const deleteWorkout = (workoutId) => {
    axiosPrivate
      .delete(`/workouts/${workoutId}`)
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
    navigate(`/workouts/edit/${workoutId}`);
  };
  const postWorkout = (title, exercises) => {
    axiosPrivate
      .post(`/workouts/add-workout`, {
        workout: {
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
      exercises: [
        { title: 'Bench Press', sets: '3', reps: '8' },
        { title: 'Lat Pulldown', sets: '3', reps: '10' },
        { title: 'Squat', sets: '5', reps: '20' },
        { title: 'Lateral Rises', sets: '4', reps: '8' },
      ],
    };
    postWorkout(stam.title, stam.exercises);
  };

  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Workouts
      </Typography>

      {!workouts ? (
        <Typography variant="body1" align="center">
          Loading workout details...
        </Typography>
      ) : workouts.length === 0 ? (
        <Typography variant="body1" align="center">
          No workouts available.
        </Typography>
      ) : (
        <List>
          {workouts.map((workout) => (
            <ListItem key={workout._id} disablePadding>
              <ListItemText
                primary={workout.title}
                secondary={`${workout.author.firstname} ${workout.author.lastname}`}
              />
              <Button
                variant="outlined"
                onClick={() => onViewDetailsClicked(workout._id)}
              >
                View Details
              </Button>
              <Button
                color="error"
                onClick={() => onDeleteWorkoutBtn(workout._id)}
              >
                <DeleteIcon></DeleteIcon>
              </Button>
              <Button onClick={() => onEditWorkoutBtn(workout._id)}>
                <EditIcon></EditIcon>
              </Button>
            </ListItem>
          ))}
        </List>
      )}

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
      <br />
      <br />
      <br />
      <br />
      <Button onClick={() => addStamWorkout()}>Add stam workouts</Button>
    </Container>
  );
};

export default Workouts;
