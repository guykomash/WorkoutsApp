import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
} from '@mui/material';

const Workouts = () => {
  axios.defaults.withCredentials = true;
  const baseURL = 'http://localhost:3080';
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);

  const getWorkouts = () => {
    axios
      .get(`${baseURL}/workouts`)
      .then((res) => setWorkouts(res.data.Workouts))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  const onViewDetailsClicked = (workoutId) => {
    navigate(`/workouts/${workoutId}`);
  };

  const renderExercises = (exercises) => {
    console.log(typeof exercises);
    // return (
    //   <Card>
    //     <CardContent sx={{ backgroundColor: 'gold' }}>
    //       {exercises.map((exercise) => {
    //         return (
    //           <Typography
    //             key={exercise.title}
    //           >{`${exercise.title} sets:${exercise.sets} reps:${exercise.reps}`}</Typography>
    //         );
    //       })}
    //     </CardContent>
    //   </Card>
    // );
  };

  const renderWorkouts = () => {
    if (workouts.length) {
      const renderWorkouts = workouts.map((workout) => (
        <Card key={workout.title}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {workout.title}
            </Typography>

            <Box>{`by ${workout.user}`}</Box>
            <Box
              sx={{ color: 'green' }}
            >{`last update: ${workout.lastUpdated}`}</Box>
            <Box
              display="flex"
              alignItems="center"
              mb={2}
              data-testid={'workout-user'}
            >
              <Typography variant="p">
                {renderExercises(workout.exercises)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ));
      return renderWorkouts;
    } else {
      return (
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              no Workouts yet...
            </Typography>
          </CardContent>
        </Card>
      );
    }
  };

  const renderWorkouts2 = () => {
    return (
      <Container maxWidth="sm">
        <br />
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          data-testid="bookListing-title"
        >
          Workouts
        </Typography>
        {workouts.length == 0 ? (
          <Typography
            variant="body1"
            align="center"
            data-testid="Workouts-noWorkoutsAvailable"
          >
            No workouts available.
          </Typography>
        ) : (
          <List data-testid={'Workouts-list'}>
            {workouts.map((workout) => (
              <ListItem key={workout.id} disablePadding>
                <ListItemText
                  primary={workout.title}
                  secondary={workout.user}
                  data-testid={`Workouts-workout-${workout.id}`}
                />
                <Button
                  variant="outlined"
                  onClick={() => onViewDetailsClicked(workout.id)}
                  data-testid={`Workouts-viewDetailsBtn-${workout.id}`}
                >
                  View Details
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    );
  };

  return renderWorkouts2();
};

export default Workouts;
