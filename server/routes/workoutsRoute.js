const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workoutController');

const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router
  .route('/')
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    workoutsController.fetchAll
  );

router.route('/:workoutId').get(workoutsController.fetchById);

router
  .route('/add-workout')
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    workoutsController.save
  );

module.exports = router;
// const { v4: uuidv4 } = require('uuid');

// const { format } = require('date-fns');

// // import methods for local database
// // const { save, fetch, fetchAll, remove } = require('../database/localDB');

// //mongoDB
// const {
//   saveWorkout,
//   fetchAllWorkouts,
//   fetchSingleWorkout,
//   removeWorkoutandFetchAll,
//   updateWorkout,
// } = require('../models/workouts');

// router.get('/', cors(corsOptions), (req, res) => {
//   console.log(req.user);
//   fetchAllWorkouts((workouts) => res.send({ Workouts: workouts }).end());
// });

// router.get('/:workoutId', cors(corsOptions), (req, res) => {
//   const { workoutId } = req.params;

//   if (!workoutId) {
//     return res.status(400).json({ message: 'workout not found' }).end();
//   }

//   fetchSingleWorkout(workoutId, (workout) => {
//     res.send({ workout }).end();
//   });
// });

// router.post('/add-workout', cors(corsOptions), (req, res) => {
//   const { workout } = req.body;
//   if (!workout) {
//     res.status(400).json({ message: 'bad add Workout request' }).end();
//   }

//   const { title, /*user,*/ exercises } = workout;

//   const newWorkout = {
//     id: uuidv4(),
//     title: title,
//     // user: req.user.name,
//     userId: req.user._id,
//     lastUpdated: format(new Date(), 'dd/MM/YYY pp'),
//     exercises: exercises,
//   };

//   saveWorkout(newWorkout, (workouts) => {
//     res.status(200).send({ Workouts: workouts }).end();
//   });
// });

// router.post('/delete-:workoutId', cors(corsOptions), (req, res) => {
//   const { workoutId } = req.params;
//   if (!workoutId) {
//     return res.status(400).json({ message: 'workout not found' }).end();
//   }
//   removeWorkoutandFetchAll(workoutId, (workouts) =>
//     res.send({ Workouts: workouts }).end()
//   );
// });

// router.get('/edit-:workoutId', cors(corsOptions), (req, res) => {
//   console.log('edit');
//   const { workoutId } = req.params;
//   if (!workoutId) {
//     return res.status(400).json({ message: 'workout not found' }).end();
//   }

//   fetchSingleWorkout(workoutId, (workout) => {
//     res.send({ workout }).end();
//   });
// });

// //update workout
// router.post('/:workoutId', cors(corsOptions), (req, res) => {
//   const { workout } = req.body;
//   if (!workout)
//     return res.status(400).json({ message: 'workout not found' }).end();
//   const { id, title, /*user,*/ exercises } = workout;
//   const updatedWorkout = {
//     id: id,
//     title: title,
//     // user: user,
//     lastUpdated: format(new Date(), 'dd/MM/YYY pp'),
//     exercises: exercises,
//   };
//   updateWorkout(updatedWorkout, () => res.end());
// });
