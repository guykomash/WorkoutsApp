import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import SessionAccordion from './SessionAccordion';

import { useWorkouts } from '../../contexts/WorkoutsProvider';

const NewSession = () => {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const { userWorkouts, savedWorkouts, fetchUserWorkouts } = useWorkouts().user;

  useEffect(() => {
    fetchUserWorkouts();
  }, []);

  const handleStartSessionBtn = () => {
    console.log(selectedWorkoutId);
  };
  return (
    <Container maxWidth="sm">
      <br />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: '#097969',
            fontWeight: '600',
            align: 'center',
            width: '500px',
            borderRadius: '6px',
          }}
        >
          New Session
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            color: '#097969',
            fontWeight: '600',
            align: 'center',
            width: '500px',
            borderRadius: '6px',
          }}
        >
          Choose Template Workout
        </Typography>
        <br />
        <br />
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Choose Template Workout</InputLabel>
            <Select
              defaultValue=""
              id="grouped-select"
              label="Grouping"
              onChange={(e) => setSelectedWorkoutId(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <ListSubheader>YOUR WORKOUTS</ListSubheader>
              {!userWorkouts ? (
                <MenuItem value={1} disabled={true}>
                  LOADING YOUR WORKOUTS...
                </MenuItem>
              ) : userWorkouts.length === 0 ? (
                <MenuItem value={1} disabled={true}>
                  You don't have any workouts...
                </MenuItem>
              ) : (
                userWorkouts.map((workout, index) => (
                  <MenuItem
                    key={`session-select-template-workout-${workout._id}}`}
                    value={workout._id}
                  >
                    {workout.title}
                  </MenuItem>
                ))
              )}
              <ListSubheader>SAVED WORKOUTS</ListSubheader>
              {!savedWorkouts ? (
                <MenuItem value={-1} disabled={true}>
                  LOADING SAVED WORKOUTS...
                </MenuItem>
              ) : savedWorkouts.length === 0 ? (
                <MenuItem value={-1} disabled={true}>
                  You haven't saved any workouts...
                </MenuItem>
              ) : (
                savedWorkouts.map((workout, index) => (
                  <MenuItem
                    key={`session-select-template-workout-saved-${workout._id}}`}
                    value={workout._id}
                  >
                    {workout.title}
                  </MenuItem>
                ))
              )}
            </Select>
            <br />
            <Button onClick={handleStartSessionBtn}>Start Session!</Button>
          </FormControl>
        </Container>
      </Container>
    </Container>
  );
};

export default NewSession;
