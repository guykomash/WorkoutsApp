const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workoutsController');

const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router
  .route('/')
  .get(verifyRoles(ROLES_LIST.User), workoutsController.fetchByUser);

router
  .route('/:workoutId')
  .get(verifyRoles(ROLES_LIST.User), workoutsController.fetchById)
  .delete(verifyRoles(ROLES_LIST.User), workoutsController.deleteById)
  .put(verifyRoles(ROLES_LIST.User), workoutsController.updateById);

router
  .route('/add-workout')
  .post(verifyRoles(ROLES_LIST.User), workoutsController.addWorkout);

module.exports = router;
