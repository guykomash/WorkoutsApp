import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Workouts from './components/Workouts';
import AddWorkout from './components/AddWorkout';
import PageNotFound from './components/PageNotFound';
import Timer from './components/Timer';
import WorkoutDetails from './components/WorkoutDetails';
import NewSession from './components/NewSession';
import EditWorkout from './components/EditWorkout';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Welcome from './components/Welcome';
import ExploreWorkouts from './components/ExploreWorkouts';

const ROLES = {
  User: 1111,
  Editor: 2222,
  Admin: 3333,
};

const NAV = {
  Welcome: '/welcome',
  Login: '/login',
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public routes*/}
        <Route path="welcome" element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/*Protected routes*/}
        <Route
          element={
            <RequireAuth
              logoutNavTo={NAV.Welcome}
              allowedRoles={[ROLES.User]}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
        <Route
          element={
            <RequireAuth logoutNavTo={NAV.Login} allowedRoles={[ROLES.User]} />
          }
        >
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:workoutId" element={<WorkoutDetails />} />
          <Route path="/workouts/add-workout" element={<AddWorkout />} />
          <Route path="/workouts/edit/:workoutId" element={<EditWorkout />} />
          <Route path="/sessions/new-session" element={<NewSession />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/explore" element={<ExploreWorkouts />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
