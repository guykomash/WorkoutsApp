import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Input,
  Grid,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

const ExploreWorkouts = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState(null);
  const [filteredWorkouts, setFilteredWorkouts] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [search, setSearch] = useState('');

  const getAllWorkouts = () => {
    axiosPrivate
      .get(`/explore`)
      .then((res) => {
        setWorkouts(res.data.Workouts);
        setFilteredWorkouts(res.data.Workouts);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllWorkouts();
  }, []);

  useEffect(() => {
    setFilteredWorkouts(
      !workouts
        ? workouts
        : workouts.filter((w) => {
            const searchLower = search.toLowerCase();
            return (
              w.title.toLowerCase().includes(searchLower) ||
              w.author.firstname.toLowerCase().includes(searchLower) ||
              w.author.lastname.toLowerCase().includes(searchLower) ||
              w.exercises.find((e) =>
                e.title.toLowerCase().includes(searchLower)
              )
            );
          })
    );
  }, [search]);

  const onViewDetailsClicked = (workoutId) => {
    navigate(`/workouts/${workoutId}`);
  };

  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Explore all workouts
      </Typography>
      <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchIcon
          fontSize="large"
          sx={{
            marginRight: 1,
            color: '#3f50b5',
          }}
        />
        <Input
          sx={{
            fontWeight: 'bold',
            '&:hover': {
              color: '#3f50b5',
            },
            '&.Mui-focused': {
              color: '#3f50b5',
            },
          }}
          fullWidth
          placeholder={'Search workouts, exercises or people'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Grid>

      {!filteredWorkouts ? (
        <Typography variant="body1" align="center">
          Loading workout details...
        </Typography>
      ) : filteredWorkouts.length === 0 ? (
        <Typography variant="body1" align="center">
          No workouts available.
        </Typography>
      ) : (
        <List>
          {filteredWorkouts.map((workout) => (
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
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default ExploreWorkouts;
