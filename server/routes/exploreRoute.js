const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workoutsController');

const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router
  .route('/')
  .get(verifyRoles(ROLES_LIST.User), workoutsController.fetchAll);

module.exports = router;
