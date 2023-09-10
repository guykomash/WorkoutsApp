import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Workouts from './Workouts';
import AddWorkout from './AddWorkout';
import PageNotFound from './PageNotFound';
import Timer from './Timer';
import WorkoutDetails from './WorkoutDetails';
import NewSession from './NewSession';
import EditWorkout from './EditWorkout';
import Login from './Login';
import Register from './Register';

import axios from 'axios';
const App = () => {
  // axios.defaults.withCredentials = true;
  const baseURL = 'http://localhost:3080';
  const [accessToken, setAccessToken] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const handleLogin = (_accessToken) => {
    console.log(`got access! \n ${accessToken}`);
    setAccessToken(_accessToken);
  };

  const getWorkouts = () => {
    axios
      .get(`${baseURL}/workouts`)
      .then((res) => {
        console.log(res.data.Workouts);
        setWorkouts(res.data.Workouts);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <Nav />
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login setAccessToken={handleLogin} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/workouts"
            element={
              <Workouts
                workouts={workouts}
                setWorkouts={setWorkouts}
                getWorkouts={getWorkouts}
              />
            }
          />
          <Route path="/workouts/:workoutId" element={<WorkoutDetails />} />
          <Route path="/workouts/add-workout" element={<AddWorkout />} />
          <Route path="/workouts/edit/:workoutId" element={<EditWorkout />} />
          <Route path="/sessions/new-session" element={<NewSession />} />

          <Route path="/timer" element={<Timer />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
