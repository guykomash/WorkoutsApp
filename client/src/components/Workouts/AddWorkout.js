import { React, useEffect, useState } from 'react';
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
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useWorkouts } from '../../contexts/WorkoutsProvider';
import { v4 as uuidv4 } from 'uuid';
import { useExercises } from '../../contexts/ExercisesProvider';
import ExerciseCreateOptionDialog from '../ExerciseCreateOptionDialog';

const AddWorkout = () => {
  // Add Workout form
  const { addWorkout } = useWorkouts().user;
  const { fetchAllExercises, moveExerciseIndex } = useExercises();
  const [newTitle, setNewTitle] = useState('');
  const [newExercises, setNewExercises] = useState([{ id: uuidv4() }]);

  useEffect(() => {
    fetchAllExercises();
  }, []);

  const navigate = useNavigate();
  const getExerciseIndexById = (id) => {
    const index = newExercises.findIndex((exercise) => {
      return exercise.id === id;
    });
    return index;
  };

  const handleMoveUpExercise = (id) => {
    const fromIndex = getExerciseIndexById(id);
    if (fromIndex === 0) {
      return;
    } else {
      setNewExercises((prev) => {
        return moveExerciseIndex(
          { exercises: prev },
          fromIndex,
          fromIndex - 1
        ).exercises.slice();
      });
    }
  };

  const handleMoveDownExercise = (id) => {
    const fromIndex = getExerciseIndexById(id);
    if (fromIndex === newExercises.length - 1) {
      return;
    } else {
      setNewExercises((prev) => {
        return moveExerciseIndex(
          { exercises: prev },
          fromIndex,
          fromIndex + 1
        ).exercises.slice();
      });
    }
  };

  const sumbitWorkout = () => {
    let isValid = true;

    if (!newTitle) {
      alert('workout title missing');
      isValid = false;
    }
    let noEmptyExercises = [];
    if (newExercises) {
      // newExercises.forEach((exercise) => {
      //   if (exercise.id && !exercise.title && !exercise.type) {
      //     newExercises.pop(exercise);
      //   } else if (!exercise.title || !exercise.type) {
      //     alert('missing type or title.');
      //     isValid = false;
      //   }
      // });
      // console.log(newExercises);
      noEmptyExercises = newExercises.filter((exercise) => {
        if (!exercise.title || !exercise.type) {
          return false;
        } else return true;
      });

      console.log(noEmptyExercises);
    } else {
      alert('exercises missing');
      isValid = false;
    }

    if (isValid) {
      const formattedExercises = noEmptyExercises.map((exercise) => {
        const newExercise = {
          title: exercise.title,
          type: exercise.type,
        };

        // only sets and reps.
        if (exercise?.exercise_id)
          newExercise.exercise_id = exercise.exercise_id;
        if (exercise?.sets) newExercise.sets = exercise.sets;
        if (exercise?.reps) newExercise.reps = exercise.reps;
        // only distance and duration
        if (exercise?.duration) newExercise.duration = exercise.duration;
        if (exercise?.distance) newExercise.distance = exercise.distance;
        // new exercise template

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

  const handleTitleChange = (nextTitle) => {
    setNewTitle(nextTitle);
  };
  const handleExerciseChange = (exerciseValue) => {
    // console.log(exerciseValue);
    if (exerciseValue) {
      const { id, title, type } = exerciseValue;
      if (exerciseValue?._id) {
        setNewExercises((prev) =>
          prev.map((e, i) =>
            e.id === id
              ? {
                  ...e,
                  title: title,
                  type: type,
                  exercise_id: exerciseValue._id,
                }
              : e
          )
        );
      } else {
        // new Exercise. np need to insert exercise_id.
        setNewExercises((prev) =>
          prev.map((e, i) =>
            e.id === id
              ? {
                  ...e,
                  title: title,
                  type: type,
                }
              : e
          )
        );
      }
    }
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
    setNewExercises((prev) => [...prev, { id: uuidv4() }]);
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
      <Button color="primary" onClick={() => onWorkoutsBtn()}>
        <KeyboardBackspaceIcon />
        back
      </Button>
      <br />
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: '#097969',
            fontWeight: '600',
            align: 'center',
            width: '300px',
            borderRadius: '6px',
          }}
        >
          Create Workout
        </Typography>
        <br />
      </Container>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: '700', color: '#3f50b5' }}>
            Title
          </Typography>
          <TextField
            label="Workout Title"
            value={newTitle}
            variant="filled"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <br />
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
                  onClick={() => handleMoveUpExercise(exercise.id)}
                >
                  <ArrowUpwardIcon></ArrowUpwardIcon>
                </Button>
                <Button
                  sx={{ color: 'green' }}
                  onClick={() => handleMoveDownExercise(exercise.id)}
                >
                  <ArrowDownwardIcon></ArrowDownwardIcon>
                </Button>
                <Button
                  color="error"
                  onClick={() => handleExerciseDelete(exercise.id)}
                >
                  <DeleteIcon></DeleteIcon>
                </Button>
              </Container>
              <br />
              <br />
              <ExerciseCreateOptionDialog
                exerciseValue={exercise}
                setExerciseValue={handleExerciseChange}
              />
              <br />
              <Container
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,auto)',
                  columnGap: 2,
                  rowGap: 2,
                }}
              >
                <TextField
                  label="Sets"
                  value={exercise.sets}
                  margin="normal"
                  onChange={(e) =>
                    handleExerciseSetsChange(e.target.value, exercise.id)
                  }
                />
                <TextField
                  label="Reps"
                  margin="normal"
                  value={exercise.reps}
                  onChange={(e) =>
                    handleExerciseRepsChange(e.target.value, exercise.id)
                  }
                />

                <TextField
                  label="Duration"
                  value={exercise.duration}
                  margin="normal"
                  onChange={(e) =>
                    handleExerciseDurationChange(e.target.value, exercise.id)
                  }
                />
                <TextField
                  label="Distance"
                  margin="normal"
                  defaultValue={''}
                  value={exercise.distance}
                  onChange={(e) =>
                    handleExerciseDistanceChange(e.target.value, exercise.id)
                  }
                />

                <br />
              </Container>
            </Paper>
          ))}
          <br />
          <Container
            sx={{
              display: 'flex',
              width: '300px',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Button
              color="primary"
              aria-label="add"
              sx={{
                color: 'white',
                backgroundColor: 'green',
                ':hover': { backgroundColor: 'white', color: 'green' },
              }}
              onClick={() => handleAddExercise()}
            >
              <AddIcon label="add" />
              Exercise
            </Button>
          </Container>
        </Grid>
      </Paper>
      <br />
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        sx={{
          height: '50px',
          color: 'white',
          backgroundColor: '#333333',
          '&:hover': {
            backgroundColor: '#333333',
            color: 'gold',
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
      <br />
      <br />
    </Container>
  );
};

export default AddWorkout;
