import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Home';
import Workouts from './Workouts';
import AddWorkout from './AddWorkout';
import PageNotFound from './PageNotFound';
import Timer from './Timer';
import WorkoutDetails from './WorkoutDetails';

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:workoutId" element={<WorkoutDetails />} />

          <Route path="/add-workout" element={<AddWorkout />} />
          <Route path="/timer" element={<Timer />} />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
};

export default App;
