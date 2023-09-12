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

const ExploreWorkouts = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const getAllWorkouts = () => {
    axiosPrivate
      .get(`/explore`)
      .then((res) => {
        setWorkouts(res.data.Workouts);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllWorkouts();
  }, []);

  const onViewDetailsClicked = (workoutId) => {
    navigate(`/workouts/${workoutId}`);
  };

  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Explore all Workouts
      </Typography>

      {workouts.length === 0 ? (
        <Typography variant="body1" align="center">
          No workouts available.
        </Typography>
      ) : (
        <List>
          {workouts.map((workout) => (
            <ListItem key={workout._id} disablePadding>
              <ListItemText primary={workout.title} secondary={workout.user} />
              <Button
                variant="outlined"
                onClick={() => onViewDetailsClicked(workout._id)}
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

export default ExploreWorkouts;
