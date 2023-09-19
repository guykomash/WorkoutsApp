import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useExercises } from '../../contexts/ExercisesProvider';
import { useWorkouts } from '../../contexts/WorkoutsProvider';
const { v4: uuidv4 } = require('uuid');

const EditWorkout = () => {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const { getUserWorkoutById, updateWorkout, restoreExercises } =
    useWorkouts().user;
  const { moveExerciseIndex } = useExercises();
  const [workout, setWorkout] = useState(getUserWorkoutById(workoutId));
  const backupExercises = getUserWorkoutById(workoutId).exercises.slice();

  const getExerciseIndexById = (id) => {
    const index = workout.exercises.findIndex((exercise) => {
      return exercise._id === id;
    });
    return index;
  };

  const handleMoveUpExercise = (id) => {
    const fromIndex = getExerciseIndexById(id);
    console.log(`fromIndex ${fromIndex}`);
    if (fromIndex === 0) {
      return;
    } else {
      const nextWorkout = moveExerciseIndex(workout, fromIndex, fromIndex - 1);
      setWorkout(nextWorkout);
    }
  };

  const handleMoveDownExercise = (id) => {
    const fromIndex = getExerciseIndexById(id);
    console.log(`fromIndex ${fromIndex}`);
    if (fromIndex === workout.exercises.length - 1) {
      return;
    } else {
      const nextWorkout = moveExerciseIndex(workout, fromIndex, fromIndex + 1);
      setWorkout(nextWorkout);
    }
  };

  const onWorkoutsBtn = () => {
    // restoreExercises(workoutId, backupExercises);
    navigate('/workouts');
  };

  const handleTitleChange = (title) => {
    setWorkout((prev) => {
      return { ...prev, title: title };
    });
  };

  const handleExerciseDelete = (id) => {
    if (workout.exercises.length > 1) {
      const nextExercises = workout.exercises.filter((e) => e._id !== id);
      setWorkout((prev) => {
        return { ...prev, exercises: nextExercises };
      });
    }
  };

  const handleExerciseTitleChange = (title, id) => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((e) =>
          e._id === id ? { ...e, title: title } : e
        ),
      };
    });
  };

  const handleExerciseTypeChange = (type, id) => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((e) =>
          e._id === id
            ? {
                ...e,
                type: type,
                sets: e.reps || '',
                reps: e.reps || '',
                duration: e.duration || '',
                distance: e.distance || '',
              }
            : e
        ),
      };
    });
  };

  const handleExerciseSetsChange = (sets, id) => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((e) =>
          e._id === id ? { ...e, sets: sets } : e
        ),
      };
    });
  };

  const handleExerciseRepsChange = (reps, id) => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((e) =>
          e._id === id ? { ...e, reps: reps } : e
        ),
      };
    });
  };

  const handleExerciseDurationChange = (duration, id) => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((e) =>
          e._id === id ? { ...e, duration: duration } : e
        ),
      };
    });
  };

  const handleExerciseDistanceChange = (distance, id) => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((e) =>
          e._id === id ? { ...e, distance: distance } : e
        ),
      };
    });
  };

  const handleAddExercise = () => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: [...prev.exercises, { _id: uuidv4(), type: 'strength' }],
      };
    });
  };

  const checkValidForm = () => {
    let isValid = true;
    if (!workout.title || !workout.exercises.length) {
      return (isValid = false);
    } else {
      workout.exercises.forEach((e) => {
        if (!e.title || e.title === '' || !e.type || e.type === '') {
          return (isValid = false);
        }
      });
    }
    return isValid;
  };
  const handleUpdateWorkout = () => {
    if (!checkValidForm()) return alert('one or more empty fields');

    // remove ids from exercises. (worst case -> there all uuid)
    const formattedExercises = workout.exercises.map((exercise) => {
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

    const formattedWorkout = {
      user_id: workout.user_id,
      title: workout.title,
      exercises: formattedExercises,
    };

    updateWorkout(workoutId, formattedWorkout);
    navigate('/workouts');
  };
  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Edit Workout
      </Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">Title </Typography>
          <TextField
            label="Workout Title"
            value={workout.title}
            variant="filled"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <br />
          <br />
          {workout.exercises &&
            workout.exercises.map((exercise, index) => (
              <Paper
                key={exercise._id}
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
                    alignItems: 'center',
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
                    sx={{ color: 'green' }}
                    onClick={() => handleMoveUpExercise(exercise._id)}
                  >
                    <ArrowUpwardIcon></ArrowUpwardIcon>
                  </Button>
                  <Button
                    sx={{ color: 'green' }}
                    onClick={() => handleMoveDownExercise(exercise._id)}
                  >
                    <ArrowDownwardIcon></ArrowDownwardIcon>
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleExerciseDelete(exercise._id)}
                  >
                    <DeleteIcon></DeleteIcon>
                  </Button>
                </Container>
                <TextField
                  id={exercise._id}
                  label="Title"
                  value={exercise.title}
                  variant="filled"
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    handleExerciseTitleChange(e.target.value, exercise._id)
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
                      handleExerciseTypeChange(e.target.value, exercise._id)
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
                  {exercise.type !== 'aerobic' ? (
                    <>
                      <TextField
                        label="Sets"
                        value={exercise.sets}
                        margin="normal"
                        onChange={(e) =>
                          handleExerciseSetsChange(e.target.value, exercise._id)
                        }
                      />
                      <TextField
                        label="Reps"
                        margin="normal"
                        value={exercise.reps}
                        onChange={(e) =>
                          handleExerciseRepsChange(e.target.value, exercise._id)
                        }
                      />
                    </>
                  ) : (
                    <>
                      <TextField
                        label="Duration"
                        value={exercise.duration}
                        margin="normal"
                        onChange={(e) =>
                          handleExerciseDurationChange(
                            e.target.value,
                            exercise._id
                          )
                        }
                      />
                      <TextField
                        label="Distance"
                        margin="normal"
                        defaultValue={''}
                        value={exercise.distance}
                        onChange={(e) =>
                          handleExerciseDistanceChange(
                            e.target.value,
                            exercise._id
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
            Add Exercise
          </Button>
        </Grid>
      </Paper>
      <br />
      <Button
        disabled={!workout}
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
