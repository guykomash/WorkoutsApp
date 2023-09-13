import { React, useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
} from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from '../hooks/useAuth';

const AddWorkout = () => {
  // Add Workout form
  const [eId, setEId] = useState(1);
  // const [newUser, setNewUser] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newExercises, setNewExercises] = useState([
    { id: JSON.stringify(eId) },
  ]);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const sumbitWorkout = () => {
    let isValid = true;

    if (!newTitle) {
      alert('title missing');
      isValid = false;
    }
    if (newExercises) {
      newExercises.forEach((exercise) => {
        if (!exercise.title || !exercise.sets || !exercise.reps) {
          alert('cannot submit an empty exercise.');
          isValid = false;
        }
      });
    } else {
      alert('exercises missing');
      isValid = false;
    }

    if (isValid) {
      const postExercises = newExercises.map((exercise) => ({
        title: exercise.title,
        sets: exercise.sets,
        reps: exercise.reps,
      }));

      postWorkout(newTitle, postExercises);
      setNewTitle('');
      setNewExercises([{}]);
      navigate('/workouts');
    }
  };

  const postWorkout = (title, exercises) => {
    axiosPrivate
      .post(`/workouts/add-workout`, {
        workout: {
          title: title,
          exercises: exercises,
        },
      })
      .then()
      .catch((error) => console.error());
  };

  const onWorkoutsBtn = () => {
    navigate('/workouts');
  };

  const handleExerciseTitleChange = (title, id) => {
    setNewExercises((prev) =>
      prev.map((e, i) => (e.id === id ? { ...e, title: title } : e))
    );
  };

  const handleExerciseSetsChange = (sets, id) => {
    setNewExercises((prev) =>
      prev.map((e) => (e.id === id ? { ...e, sets: sets } : e))
    );
  };

  const handleExerciseRepsChange = (reps, id) => {
    setNewExercises((prev) =>
      prev.map((e, i) => (e.id === id ? { ...e, reps: reps } : e))
    );
  };

  const handleAddExercise = () => {
    setNewExercises((prev) => [...prev, { id: JSON.stringify(eId + 1) }]);
    setEId(eId + 1);
  };
  const handleExerciseDelete = (id) => {
    if (newExercises.length > 1) {
      const nextExercises = newExercises.filter((e) => e.id !== id);
      setNewExercises(nextExercises);
      console.log(nextExercises);
    }
  };
  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Add Workout
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Grid item xs={12}>
          <TextField
            label="Workout Title"
            fullWidth
            margin="normal"
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
          />
          {/* <TextField
          label="Creator name"
          fullWidth
          margin="normal"
          onChange={(event) => {
            setNewUser(event.target.value);
          }}
        /> */}

          <Grid>
            <br />
            <Typography variant="h5" align="center">
              {`Exercises:`}
            </Typography>
            <br />
            {newExercises.map((exercise, index) => (
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
                  onChange={(e) =>
                    handleExerciseSetsChange(e.target.value, exercise.id)
                  }
                />
                <TextField
                  id={exercise.id}
                  label="Reps"
                  margin="normal"
                  value={exercise.reps}
                  onChange={(e) =>
                    handleExerciseRepsChange(e.target.value, exercise.id)
                  }
                />
                <br />
              </Grid>
            ))}
          </Grid>
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
        onClick={(e) => {
          sumbitWorkout(e.target.value);
        }}
      >
        Submit Workout
      </Button>
      <br />
      <br />
      <Button
        style={{ minWidth: '100%' }}
        variant="contained"
        color="primary"
        onClick={() => onWorkoutsBtn()}
        data-testid="filters-WorkoutsBtn"
      >
        Back to Workouts
      </Button>
    </Container>
  );
};

export default AddWorkout;
