import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Paper,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import DeleteBtnWithDialog from '../DeleteBtnWithDialog';
import { useWorkouts } from '../../contexts/WorkoutsProvider';
const Workouts = () => {
  const navigate = useNavigate();
  const { userWorkouts, deleteWorkout, savedWorkouts, deleteSavedWorkout } =
    useWorkouts().user;

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

  const onUnsaveBtn = (workoutId) => {
    console.log(workoutId);
    deleteSavedWorkout(workoutId);
  };

  // //for testing.
  // const addStamWorkout = () => {
  //   const stam = {
  //     title: 'Test Exercises Workout',
  //     exercises: [
  //       { title: 'Bench Press', type: 'strength', sets: '3', reps: '8' },
  //       { title: 'lat pulldown', type: 'strength', sets: '3', reps: '10' },
  //       { title: 'SQUAT', type: 'strength', sets: '5', reps: '20' },
  //       { title: 'Lateral Rises', type: 'strength', sets: '4', reps: '8' },
  //       { title: 'deadlift', type: 'strength', sets: '4', reps: '8' },
  //       {
  //         title: 'RunninG',
  //         type: 'aerobic',
  //         duration: '10 minutes',
  //         distance: '1 miles',
  //       },
  //     ],
  //   };

  //   const testExercise = async (title, exercises) => {
  //     try {
  //       const response = await axiosPrivate.post('/exercises/test', {
  //         workout: {
  //           title: title,
  //           exercises: exercises,
  //         },
  //       });
  //       console.log(response.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   testExercise(stam.title, stam.exercises);
  // };

  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h5" align="center" gutterBottom>
        My workouts
      </Typography>
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
        create Workout
      </Button>
      <br />
      <br />
      <Paper elevation={2} sx={{ p: 2, maxHeight: '280px', overflow: 'auto' }}>
        {!userWorkouts ? (
          <Typography variant="body1" align="center">
            Loading workout details...
          </Typography>
        ) : userWorkouts.length === 0 ? (
          <Typography variant="body1" align="center">
            You haven't created any workouts.
          </Typography>
        ) : (
          <List>
            {userWorkouts.map((workout) => (
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

                <DeleteBtnWithDialog
                  title={'Delete workout?'}
                  content={'This will delete this workout permanently.'}
                  id={workout._id}
                  onDelete={() => onDeleteWorkoutBtn(workout._id)}
                />
                <Button onClick={() => onEditWorkoutBtn(workout._id)}>
                  <EditIcon></EditIcon>
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <br />
      <br />
      <List>
        <Typography variant="h6" align="center">
          Saved workouts
        </Typography>
        <br />
        <Paper
          elevation={2}
          sx={{ p: 2, maxHeight: '280px', overflow: 'auto' }}
        >
          {!savedWorkouts ? (
            <Typography variant="body1" align="center">
              Loading saved workouts...
            </Typography>
          ) : savedWorkouts.length === 0 ? (
            <Typography variant="body1" align="center">
              You haven't saved any workouts.
            </Typography>
          ) : (
            savedWorkouts.map((workout) => (
              <ListItem key={workout._id} disablePadding>
                <ListItemText
                  primary={workout.title}
                  secondary={`${workout.author.firstname} ${workout.author.lastname}`}
                />
                <Button color="error" onClick={() => onUnsaveBtn(workout._id)}>
                  Unsave
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => onViewDetailsClicked(workout._id)}
                >
                  View Details
                </Button>
              </ListItem>
            ))
          )}
        </Paper>
      </List>
      <br />
      <br />
      <br />
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

export default Workouts;
