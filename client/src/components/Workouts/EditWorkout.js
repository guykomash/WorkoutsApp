import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
} from '@mui/material';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useExercises } from '../../contexts/ExercisesProvider';
import { useWorkouts } from '../../contexts/WorkoutsProvider';
import ExerciseCreateOptionDialog from '../ExerciseCreateOptionDialog';
const { v4: uuidv4 } = require('uuid');

const EditWorkout = () => {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const { getEditUserWorkoutById, updateWorkout } = useWorkouts().user;
  const { moveExerciseIndex, fetchAllExercises } = useExercises();
  const [workout, setWorkout] = useState(getEditUserWorkoutById(workoutId));

  useEffect(() => {
    fetchAllExercises();
  }, []);

  const getExerciseIndexById = (id) => {
    const index = workout.exercises.findIndex((exercise) => {
      return exercise.id === id;
    });
    return index;
  };

  const handleMoveUpExercise = (id) => {
    const fromIndex = getExerciseIndexById(id);
    // console.log(`fromIndex ${fromIndex}`);
    if (fromIndex === 0) {
      return;
    } else {
      const nextWorkout = moveExerciseIndex(workout, fromIndex, fromIndex - 1);
      setWorkout(nextWorkout);
    }
  };

  const handleMoveDownExercise = (id) => {
    const fromIndex = getExerciseIndexById(id);
    // console.log(`fromIndex ${fromIndex}`);
    if (fromIndex === workout.exercises.length - 1) {
      return;
    } else {
      const nextWorkout = moveExerciseIndex(workout, fromIndex, fromIndex + 1);
      setWorkout(nextWorkout);
    }
  };

  const onWorkoutsBtn = () => {
    navigate('/workouts');
  };

  const handleTitleChange = (title) => {
    setWorkout((prev) => {
      return { ...prev, title: title };
    });
  };

  const handleExerciseDelete = (id) => {
    if (workout.exercises.length > 1) {
      const nextExercises = workout.exercises.filter((e) => e.id !== id);
      setWorkout((prev) => {
        return { ...prev, exercises: nextExercises };
      });
    }
  };

  const handleExerciseChange = (exerciseValue) => {
    // console.log(exerciseValue);
    if (exerciseValue) {
      const { id, title, type } = exerciseValue;
      if (exerciseValue?._id) {
        setWorkout((prevWorkout) => {
          return {
            ...prevWorkout,
            exercises: prevWorkout.exercises.map((e) =>
              e.id === id
                ? {
                    ...e,
                    title: title,
                    type: type,
                    exercise_id: exerciseValue._id,
                  }
                : e
            ),
          };
        });
      } else {
        // User added a new exercise. no need to insert exercise_id.
        setWorkout((prevWorkout) => {
          return {
            ...prevWorkout,
            exercises: prevWorkout.exercises.map((e) =>
              e.id === id
                ? {
                    ...e,
                    title: title,
                    type: type,
                  }
                : e
            ),
          };
        });
      }
    }
  };
  // const handleExerciseTitleChange = (title, id) => {
  //   setWorkout((prev) => {
  //     return {
  //       ...prev,
  //       exercises: prev.exercises.map((e) =>
  //         e._id === id ? { ...e, title: title } : e
  //       ),
  //     };
  //   });
  // };

  // const handleExerciseTypeChange = (type, id) => {
  //   setWorkout((prev) => {
  //     return {
  //       ...prev,
  //       exercises: prev.exercises.map((e) =>
  //         e._id === id
  //           ? {
  //               ...e,
  //               type: type,
  //               sets: e.reps || '',
  //               reps: e.reps || '',
  //               duration: e.duration || '',
  //               distance: e.distance || '',
  //             }
  //           : e
  //       ),
  //     };
  //   });
  // };

  const handleExerciseSetsChange = (sets, id) => {
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
        exercises: prev.exercises.map((e) =>
          e.id === id ? { ...e, reps: reps } : e
        ),
      };
    });
  };

  const handleExerciseDurationChange = (duration, id) => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((e) =>
          e.id === id ? { ...e, duration: duration } : e
        ),
      };
    });
  };

  const handleExerciseDistanceChange = (distance, id) => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((e) =>
          e.id === id ? { ...e, distance: distance } : e
        ),
      };
    });
  };

  const handleAddExercise = () => {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: [...prev.exercises, { id: uuidv4() }],
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
      if (exercise.exercise_id) newExercise.exercise_id = exercise.exercise_id;
      if (exercise?.sets) newExercise.sets = exercise.sets;
      if (exercise?.reps) newExercise.reps = exercise.reps;
      if (exercise?.duration) newExercise.duration = exercise.duration;
      if (exercise?.distance) newExercise.distance = exercise.distance;

      return newExercise;
    });

    const formattedWorkout = {
      user_id: workout.user_id,
      title: workout.title,
      exercises: formattedExercises,
    };
    // console.log(formattedWorkout);
    updateWorkout(workoutId, formattedWorkout);
    navigate('/workouts');
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
          fullWidth
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
          Edit Workout
        </Typography>
      </Container>
      <br />
      <Paper elevation={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: '700', color: '#3f50b5' }}>
            Title
          </Typography>
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
                {/* <TextField
                  id={exercise._id}
                  label="Title"
                  value={exercise.title}
                  variant="filled"
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    handleExerciseTitleChange(e.target.value, exercise._id)
                  }
                /> */}
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
              Add Exercise
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
        onClick={() => {
          handleUpdateWorkout();
        }}
      >
        Update Workout
      </Button>
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

export default EditWorkout;
