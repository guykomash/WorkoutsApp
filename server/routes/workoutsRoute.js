const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { baseUrl } = require('../../constants');
const corsOptions = {
  origin: `${baseUrl.client}`,
  credentials: true,
};
router.use(cors());
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));

const { v4: uuidv4 } = require('uuid');

const { format } = require('date-fns');

// import methods for local database
// const { save, fetch, fetchAll, remove } = require('../database/localDB');

//mongoDB
const {
  saveWorkout,
  fetchAllWorkouts,
  fetchSingleWorkout,
  removeWorkoutandFetchAll,
  updateWorkout,
} = require('../models/workouts');

router.get('/', cors(corsOptions), (req, res) => {
  fetchAllWorkouts((workouts) => res.send({ Workouts: workouts }).end());
});

router.get('/:workoutId', cors(corsOptions), (req, res) => {
  const { workoutId } = req.params;

  if (!workoutId) {
    return res.status(400).json({ message: 'workout not found' }).end();
  }

  fetchSingleWorkout(workoutId, (workout) => {
    res.send({ workout }).end();
  });
});

router.post('/add-workout', cors(corsOptions), (req, res) => {
  const { workout } = req.body;
  if (!workout) {
    res.status(400).json({ message: 'bad add Workout request' }).end();
  }

  const { title, user, exercises } = workout;

  const newWorkout = {
    id: uuidv4(),
    title: title,
    user: user,
    lastUpdated: format(new Date(), 'dd/MM/YYY pp'),
    exercises: exercises,
  };

  saveWorkout(newWorkout, (workouts) => {
    res.status(200).send({ Workouts: workouts }).end();
  });
});

router.post('/delete-:workoutId', cors(corsOptions), (req, res) => {
  const { workoutId } = req.params;
  if (!workoutId) {
    return res.status(400).json({ message: 'workout not found' }).end();
  }
  removeWorkoutandFetchAll(workoutId, (workouts) =>
    res.send({ Workouts: workouts }).end()
  );
});

router.get('/edit-:workoutId', cors(corsOptions), (req, res) => {
  console.log('edit');
  const { workoutId } = req.params;
  if (!workoutId) {
    return res.status(400).json({ message: 'workout not found' }).end();
  }

  fetchSingleWorkout(workoutId, (workout) => {
    res.send({ workout }).end();
  });
});

router.post('/:workoutId', cors(corsOptions), (req, res) => {
  const { workout } = req.body;
  if (!workout)
    return res.status(400).json({ message: 'workout not found' }).end();
  const { id, title, user, exercises } = workout;
  const updatedWorkout = {
    id: id,
    title: title,
    user: user,
    lastUpdated: format(new Date(), 'dd/MM/YYY pp'),
    exercises: exercises,
  };
  updateWorkout(updatedWorkout, () => res.end());
});

process.on('uncaughtException', (err) => {
  console.error(`uncaught error: ${err} `);
  process.exit(1);
});

module.exports = router;
