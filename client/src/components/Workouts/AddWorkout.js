import { React, useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useWorkouts } from '../../contexts/WorkoutsProvider';
import { v4 as uuidv4 } from 'uuid';

const AddWorkout = () => {
  // Add Workout form
  const { addWorkout } = useWorkouts().user;
  const [newTitle, setNewTitle] = useState('');
  const [newExercises, setNewExercises] = useState([
    { id: uuidv4(), type: 'strength' },
  ]);

  const navigate = useNavigate();

  const sumbitWorkout = () => {
    let isValid = true;

    if (!newTitle) {
      alert('title missing');
      isValid = false;
    }

    if (newExercises) {
      newExercises.forEach((exercise) => {
        if (!exercise.title || !exercise.type) {
          alert('missing type or title.');
          isValid = false;
        }
      });
    } else {
      alert('exercises missing');
      isValid = false;
    }

    if (isValid) {
      const formattedExercises = newExercises.map((exercise) => {
        const newExercise = {
          title: exercise.title,
          type: exercise.type,
        };
        if (exercise.type === 'strength') {
          // only sets and reps.
          if (exercise?.sets) newExercise.sets = exercise.sets;
          if (exercise?.reps) newExercise.reps = exercise.reps;
        } else {
          // only distance and duration
          if (exercise?.duration) newExercise.duration = exercise.duration;
          if (exercise?.distance) newExercise.distance = exercise.distance;
        }

        return newExercise;
      });

      addWorkout(newTitle, formattedExercises);
      setNewTitle('');
      setNewExercises([{}]);
      navigate('/workouts');
    }
  };

  const onWorkoutsBtn = () => {
    navigate('/workouts');
  };

  const handleExerciseTitleChange = (title, id) => {
    setNewExercises((prev) =>
      prev.map((e, i) => (e.id === id ? { ...e, title: title } : e))
    );
  };
  const handleExerciseTypeChange = (type, id) => {
    setNewExercises((prev) =>
      prev.map((e, i) => (e.id === id ? { ...e, type: type } : e))
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

  const handleExerciseDurationChange = (duration, id) => {
    setNewExercises((prev) =>
      prev.map((e, i) => (e.id === id ? { ...e, duration: duration } : e))
    );
  };
  const handleExerciseDistanceChange = (distance, id) => {
    setNewExercises((prev) =>
      prev.map((e, i) => (e.id === id ? { ...e, distance: distance } : e))
    );
  };

  const handleAddExercise = () => {
    setNewExercises((prev) => [...prev, { id: uuidv4(), type: 'strength' }]);
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
        Create workout
      </Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <br />
          <Typography variant="h6">Title </Typography>
          <TextField
            sx={{ inputRoot: '30px', fontSize: '30' }}
            label="Workout Title"
            fullWidth
            margin="normal"
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
          />
          <Grid>
            <br />
            <Typography variant="h6">Exercises</Typography>
            <br />
            {newExercises.map((exercise, index) => (
              <Paper
                key={exercise.id}
                elevation={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  mr: 2,
                  marginBottom: 2,
                }}
              >
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#3f50b5',
                    }}
                  >{`Exercise ${index + 1}`}</Typography>
                  <Button
                    color="error"
                    onClick={() => handleExerciseDelete(exercise.id)}
                  >
                    <DeleteIcon></DeleteIcon>
                  </Button>
                </Container>
                <TextField
                  fullWidth
                  id={exercise.id}
                  label="Title"
                  value={exercise.title}
                  margin="normal"
                  onChange={(e) =>
                    handleExerciseTitleChange(e.target.value, exercise.id)
                  }
                />
                <br />
                <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FormLabel
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      fontWeight: '500',
                      color: 'black',
                    }}
                  >
                    Exercise Type
                  </FormLabel>
                  <RadioGroup
                    sx={{ display: 'felx', justifyContent: 'center' }}
                    defaultValue={'strength'}
                    value={exercise.type}
                    onChange={(e) =>
                      handleExerciseTypeChange(e.target.value, exercise.id)
                    }
                    row
                  >
                    <FormControlLabel
                      value="strength"
                      control={<Radio />}
                      label="Strength"
                    />
                    <FormControlLabel
                      value="aerobic"
                      control={<Radio />}
                      label="Aerobic"
                    />
                  </RadioGroup>
                </FormControl>

                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  {exercise.type === 'strength' ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <TextField
                        id={exercise.id}
                        label="Duration"
                        value={exercise.duration}
                        margin="normal"
                        onChange={(e) =>
                          handleExerciseDurationChange(
                            e.target.value,
                            exercise.id
                          )
                        }
                      />
                      <TextField
                        id={exercise.id}
                        label="Distance"
                        margin="normal"
                        value={exercise.distance}
                        onChange={(e) =>
                          handleExerciseDistanceChange(
                            e.target.value,
                            exercise.id
                          )
                        }
                      />
                    </>
                  )}
                  <br />
                </Container>
              </Paper>
            ))}

            <br />
            <Button
              color="primary"
              aria-label="add"
              variant="contained"
              onClick={() => handleAddExercise()}
            >
              <AddIcon label="add" />
              Exercise
            </Button>
          </Grid>
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
      >
        Back to Workouts
      </Button>
      {/* {!exercises ? (
        <Typography>Loading exercises</Typography>
      ) : exercises.length === 0 ? (
        <Typography>no exercises found.</Typography>
      ) : (
        exercises.map((e, i) => (
          <>
            <Typography key={`${e.title}-${e.type}-${i}`}>{e.title}</Typography>
            <Typography>{e.type}</Typography>
          </>
        ))
      )} */}
    </Container>
  );
};

export default AddWorkout;
