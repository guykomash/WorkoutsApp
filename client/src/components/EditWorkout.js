import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
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
  TextField,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const { v4: uuidv4 } = require('uuid');

const EditWorkout = () => {
  const axiosPrivate = useAxiosPrivate();
  const { workoutId } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState([]);

  const getWorkout = () => {
    axiosPrivate
      .get(`/workouts/${workoutId}`)
      .then((res) => {
        if (res.data.workout) {
          setWorkout(res.data.workout);
        } else navigate('/404');
      })
      .catch((error) => console.error(error));
  };

  const updateWorkout = (workout) => {
    console.log('updatedWorkout');
    axiosPrivate
      .post(
        `/workouts/${workout.id}`,
        {
          workout,
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then()
      .catch((error) => console.error());
  };

  useEffect(() => {
    getWorkout();
  }, []);

  const onWorkoutsBtn = () => {
    navigate('/workouts');
    console.log(workout);
  };

  const handleTitleChange = (title) => {
    setWorkout((prev) => {
      return { ...prev, title: title };
    });
  };
  const handleUserChange = (user) => {
    setWorkout((prev) => {
      return { ...prev, user: user };
    });
  };
  const handleExerciseDelete = (id) => {
    if (workout.exercises.length > 1) {
      const nextExercises = workout.exercises.filter((e) => e.id != id);
      setWorkout((prev) => {
        return { ...prev, exercises: nextExercises };
      });
    }
  };

  const handleExerciseTitleChange = (title, id) => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((e, i) =>
          e.id === id ? { ...e, title: title } : e
        ),
      };
    });
  };

  const handleExerciseSetsChange = (sets, id) => {
    console.log('here');
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((e) =>
          e.id === id ? { ...e, sets: sets } : e
        ),
      };
    });
  };

  const handleExerciseRepsChange = (reps, id) => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((e, i) =>
          e.id === id ? { ...e, reps: reps } : e
        ),
      };
    });
  };

  const handleAddExercise = () => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: [...prev.exercises, { id: JSON.stringify(uuidv4()) }],
      };
    });
  };

  const handleUpdateWorkout = () => {
    const formattedExercises = workout.exercises.map((e, index) => {
      return { ...e, id: JSON.stringify(index + 1) };
    });
    const formattedWorkout = {
      ...workout,
      exercises: formattedExercises,
    };

    //updateWorkout HTTP REQUREST! , than navigate /workouts.
    updateWorkout(formattedWorkout);
    navigate('/workouts');
  };
  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Edit Workout
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Grid item xs={12}>
          <TextField
            label="Workout Title"
            value={workout.title}
            variant="filled"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <TextField
            label="Creator Name"
            value={workout.user}
            variant="filled"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleUserChange(e.target.value)}
          />
          {workout.exercises &&
            workout.exercises.map((exercise, index) => (
              <Grid key={exercise.id}>
                <Typography
                  variant="body"
                  sx={{ fontSize: 18, fontStyle: 'italic' }}
                >{`Exercise ${index + 1}`}</Typography>
                <Button
                  color="error"
                  onClick={() => handleExerciseDelete(exercise.id)}
                >
                  <DeleteIcon></DeleteIcon>
                </Button>
                <TextField
                  id={exercise.id}
                  label="Title"
                  value={exercise.title}
                  variant="filled"
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    handleExerciseTitleChange(e.target.value, exercise.id)
                  }
                />
                <TextField
                  id={exercise.id}
                  label="Sets"
                  value={exercise.sets}
                  margin="normal"
                  variant="filled"
                  onChange={(e) =>
                    handleExerciseSetsChange(e.target.value, exercise.id)
                  }
                />
                <TextField
                  id={exercise.id}
                  label="Reps"
                  margin="normal"
                  value={exercise.reps}
                  variant="filled"
                  onChange={(e) =>
                    handleExerciseRepsChange(e.target.value, exercise.id)
                  }
                />

                <br />
              </Grid>
            ))}
          <br />
          <Button
            color="primary"
            aria-label="add"
            variant="contained"
            onClick={() => handleAddExercise()}
          >
            <AddIcon label="add" />
            Add Exercise
          </Button>
        </Grid>
      </Paper>
      <br />
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        sx={{
          color: 'green',
          '&:hover': {
            backgroundColor: 'green',
            color: 'white',
          },
        }}
        onClick={() => {
          handleUpdateWorkout();
        }}
      >
        Update Workout
      </Button>
      <br />
      <br />
      <Button
        style={{ minWidth: '100%' }}
        variant="contained"
        color="primary"
        onClick={() => onWorkoutsBtn()}
      >
        Back to Workouts
      </Button>
    </Container>
  );
};

export default EditWorkout;
