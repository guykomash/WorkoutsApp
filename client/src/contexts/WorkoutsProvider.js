import { createContext, useState, useContext } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useExercises } from './ExercisesProvider';

const WorkoutsContext = createContext([]);

export const useWorkouts = () => {
  return useContext(WorkoutsContext);
};
export const WorkoutsProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate();
  const { fetchAllExercises } = useExercises();

  // STATES
  //global workouts
  const [allWorkouts, setAllWorkouts] = useState(null);

  // explore filtered by search query
  const [filteredWorkouts, setFilteredWorkouts] = useState(null);

  // user workouts and saved workouts
  const [userWorkouts, setUserWorkouts] = useState(null);
  const [savedWorkouts, setSavedWorkouts] = useState(null);

  // METHODS

  // All workouts
  const getWorkoutById = (workoutId) => {
    if (!allWorkouts) return;
    return allWorkouts.find((workout) => workout._id === workoutId);
  };

  const fetchAllWorkouts = async () => {
    try {
      const response = await axiosPrivate.get(`/workouts/all`);
      setAllWorkouts(response.data.Workouts);
      setFilteredWorkouts(response.data.Workouts);
    } catch (err) {
      console.error(err);
    }
  };

  // User workouts

  const fetchUserWorkouts = async () => {
    console.log('fetching user workouts... (and saved)');
    try {
      const response = await axiosPrivate.get(`/workouts`);
      setUserWorkouts(response?.data?.Workouts);
      setSavedWorkouts(response.data.savedWorkouts);
      console.log(response?.data?.Workouts);
      console.log(response.data.savedWorkouts);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserWorkoutById = (workoutId) => {
    if (!userWorkouts) return;
    const foundWorkout = userWorkouts.find(
      (workout) => workout._id === workoutId
    );
    if (!foundWorkout) return;
    return JSON.parse(JSON.stringify(foundWorkout)); // returns a copy.
  };

  const updateWorkout = async (workoutId, workout) => {
    try {
      const response = await axiosPrivate.put(`/workouts/${workoutId}`, {
        workout: workout,
      });
      setUserWorkouts(response.data.Workouts);
      await fetchAllExercises(); // user maybe added new exercises.
    } catch (err) {
      console.error(err);
    }
  };

  const addWorkout = async (title, exercises) => {
    console.log(`addWorkout`);
    try {
      const response = await axiosPrivate.post(`/workouts/add-workout`, {
        workout: {
          title: title,
          exercises: exercises,
        },
      });
      console.log(response.data.Workouts);
      setUserWorkouts(response.data.Workouts);
      await fetchAllExercises(); // user maybe added new exercises.
    } catch (err) {
      console.error(err);
    }
  };

  const deleteWorkout = async (workoutId) => {
    try {
      const response = await axiosPrivate.delete(`/workouts/${workoutId}`);
      setUserWorkouts(response.data.Workouts);
    } catch (err) {
      console.error(err);
    }
  };

  // User saved workouts
  const getSavedWorkoutById = (workoutId) => {
    if (!savedWorkouts) return;
    return savedWorkouts.find((workout) => workout._id === workoutId);
  };
  const addSavedWorkout = async (workoutId) => {
    try {
      const response = await axiosPrivate.post(`/workouts/save-workout`, {
        workoutId,
      });
      setSavedWorkouts(response.data.savedWorkouts);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSavedWorkout = async (workoutId) => {
    try {
      const response = await axiosPrivate.put(`/workouts/save-workout`, {
        workoutId,
      });
      setSavedWorkouts(response.data.savedWorkouts);
    } catch (err) {
      console.error(err);
    }
  };

  const restoreExercises = (workoutId, backUpExercises) => {
    console.log('restoreExercises');
    setUserWorkouts((prevWorkouts) => {
      return prevWorkouts.map((workout) => {
        if (workout._id === workoutId) {
          console.log(workout.exercises);
          console.log(backUpExercises);
          return { ...workout, exercises: backUpExercises };
        } else return workout;
      });
    });
  };

  const value = {
    global: {
      allWorkouts,
      setAllWorkouts,
      getWorkoutById,
      fetchAllWorkouts,
      filteredWorkouts,
      setFilteredWorkouts,
    },
    user: {
      userWorkouts,
      setUserWorkouts,
      savedWorkouts,
      setSavedWorkouts,
      fetchUserWorkouts,
      getUserWorkoutById,
      updateWorkout,
      addWorkout,
      deleteWorkout,
      getSavedWorkoutById,
      addSavedWorkout,
      deleteSavedWorkout,
      restoreExercises,
    },
  };

  return (
    <WorkoutsContext.Provider value={value}>
      {children}
    </WorkoutsContext.Provider>
  );
};

export default WorkoutsContext;
