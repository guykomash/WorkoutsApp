const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { baseUrl, rootDir } = require('../../constants');
const corsOptions = {
  origin: `${baseUrl.client}`,
  credentials: true,
};
router.use(cors());
router.use(express.json());
router.use(bodyParser.urlencoded());

const { Workouts } = require('../models/Workouts');

const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const path = require('path');
const p = path.join(rootDir, 'database', 'workoutsDB.json');

router.post('/delete-:workoutId', cors(corsOptions), (req, res) => {
  const { workoutId } = req.params;
  console.log('s' + workoutId);

  Workouts.map((workout) => {
    if (workout.id != workoutId) return workout;
  });

  console.log(Workouts);
  res.send({ Workouts });
});

router.get('/', cors(corsOptions), (req, res) => {
  res.send({ Workouts });
});

router.get('/:workoutId', cors(corsOptions), (req, res) => {
  const { workoutId } = req.params;
  const workout = Workouts.find((workout) => workout.id === workoutId);
  if (!workout) {
    return res.status(400).json({ message: 'workout not found' }).end();
  }
  res.send({ workout });
});

router.post('/add-workout', cors(corsOptions), (req, res) => {
  const { workout } = req.body;
  if (!workout) {
    res.status(400).json({ message: 'bad addWorkout request' }).end();
  }

  const { title, user, exercises } = workout;

  const newWorkout = {
    id: uuidv4(),
    title: title,
    user: user,
    lastUpdated: 'date from a date library',
    exercises: exercises,
  };

  Workouts.push(newWorkout);

  //add newWorkout to Database
  saveWorkoutToFile(newWorkout);

  res.status(200).send({ Workouts });
});

const saveWorkoutToFile = (workout) => {
  let workouts = [];
  fs.readFile(p, (err, data) => {
    if (!err && data.byteLength) {
      workouts = JSON.parse(data);
    }
    workouts.push(workout);
    fs.writeFile(p, JSON.stringify(workouts), (err) => {
      if (err) console.log(err);
    });
  });
};

const fetchWorkoutsFromFile = () => {
  let workouts = [];
  fs.readFile(p, (err, data) => {
    if (!err) {
      workouts = JSON.parse(data);
      return workouts;
    } else return [];
  });
};

module.exports = router;
