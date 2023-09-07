import React from 'react';
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

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
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
