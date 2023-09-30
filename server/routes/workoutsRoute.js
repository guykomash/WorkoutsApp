const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const workoutsController = require('../controllers/workoutsController');
=======
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
>>>>>>> parent of ad4fe9c (added MongoDB - add , delete & update workouts)

const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

<<<<<<< HEAD
router
  .route('/')
  .get(verifyRoles(ROLES_LIST.User), workoutsController.fetchByUser);

router
  .route('/save-workout')
  .put(verifyRoles(ROLES_LIST.User), workoutsController.deleteSavedWorkout)
  .post(verifyRoles(ROLES_LIST.User), workoutsController.addSavedWorkout);

router
  .route('/add-workout')
  .post(verifyRoles(ROLES_LIST.User), workoutsController.addWorkout);

router
  .route('/user/:userId')
  .get(verifyRoles(ROLES_LIST.User), workoutsController.fetchByOtherUser);

router.get('/all', verifyRoles(ROLES_LIST.User), workoutsController.fetchAll);

router
  .route('/:workoutId')
  .get(verifyRoles(ROLES_LIST.User), workoutsController.fetchById)
  .delete(verifyRoles(ROLES_LIST.User), workoutsController.deleteById)
  .put(verifyRoles(ROLES_LIST.User), workoutsController.updateById);
=======
const fs = require('fs');
const path = require('path');
const workoutsDBPath = path.join(rootDir, 'database', 'workoutsDB.json');

router.post('/delete-:workoutId', cors(corsOptions), (req, res) => {
  console.log('delete');

  const { workoutId } = req.params;
  console.log(workoutId);

  deleteWorkoutFromFile(workoutId, (workouts) => {
    res.send({ Workouts: workouts });
  });
});

router.get('/', cors(corsOptions), (req, res) => {
  fetchWorkoutsFromFile((workouts) => res.send({ Workouts: workouts }).end());
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
    res.status(400).json({ message: 'bad add Workout request' }).end();
  }

  const { title, user, exercises } = workout;

  const newWorkout = {
    id: uuidv4(),
    title: title,
    user: user,
    lastUpdated: 'date from a date library',
    exercises: exercises,
  };

  // sWorkouts.push(newWorkout);

  //add newWorkout to Database
  saveWorkoutToFile(newWorkout, (workouts) => {
    res.status(200).send({ Workouts: workouts });
  });
});

const saveWorkoutToFile = (workout, cb) => {
  console.log('Save');
  let workouts = [];
  fs.readFile(workoutsDBPath, (err, data) => {
    if (err) throw err;
    if (data.length) {
      workouts = JSON.parse(data);
    }
    workouts.push(workout);

    fs.writeFile(workoutsDBPath, JSON.stringify(workouts), (err) => {
      if (err) throw err;
    });

    cb(workouts);
  });
};

const fetchWorkoutsFromFile = (cb) => {
  let workouts = [];
  fs.readFile(workoutsDBPath, (err, data) => {
    if (err) throw err;
    if (data.length) {
      workouts = JSON.parse(data);
    }

    cb(workouts);
  });
};

const deleteWorkoutFromFile = (id, cb) => {
  let workouts = [];
  fs.readFile(workoutsDBPath, (err, data) => {
    if (err) throw err;
    if (data.length) {
      workouts = JSON.parse(data);
    }
    workouts = workouts.filter((w) => w.id != id);
    console.log(workouts);

    fs.writeFile(workoutsDBPath, JSON.stringify(workouts), (err) => {
      if (err) throw err;
    });

    cb(workouts);
  });
};

process.on('uncaughtException', (err) => {
  console.error(`uncaught error: ${err} `);
  process.exit(1);
});
>>>>>>> parent of ad4fe9c (added MongoDB - add , delete & update workouts)

module.exports = router;
