const { getDB } = require('../database/mongoDB');

const saveWorkout = (workout, cb) => {
  const db = getDB();
  return db
    .collection('workouts')
    .insertOne(workout)
    .then(() => fetchAllWorkouts(cb))
    .catch((err) => console.error(err));
};

const fetchAllWorkouts = (cb) => {
  const db = getDB();
  db.collection('workouts')
    .find()
    .toArray()
    .then((workouts) => {
      cb(workouts);
    })
    .catch((err) => console.error(err));
};

const fetchSingleWorkout = (workoutId, cb) => {
  const db = getDB();
  db.collection('workouts')
    .find({ id: workoutId })
    .next()
    .then((workout) => {
      cb(workout);
    })
    .catch((err) => console.error(err));
};

const removeWorkoutandFetchAll = (workoutId, cb) => {
  const db = getDB();
  db.collection('workouts')
    .deleteOne({ id: workoutId })
    .then(() => fetchAllWorkouts(cb))
    .catch((err) => console.error(err));
};
const updateWorkout = (workout, cb) => {
  const db = getDB();
  db.collection('workouts')
    .updateOne(
      { id: workout.id },
      {
        $set: {
          title: workout.title,
          user: workout.user,
          lastUpdated: workout.lastUpdated,
          exercises: workout.exercises,
        },
      }
    )
    .then(() => fetchAllWorkouts(cb))
    .catch((e) => console.log(e));
};
module.exports = {
  saveWorkout,
  fetchAllWorkouts,
  fetchSingleWorkout,
  removeWorkoutandFetchAll,
  updateWorkout,
};
