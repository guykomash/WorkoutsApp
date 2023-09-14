const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router
  .route('/users/get-users')
  .get(verifyRoles(ROLES_LIST.Admin), usersController.fetchAllUsers);

router.delete(
  '/users/:userId',
  verifyRoles(ROLES_LIST.Admin),
  usersController.deleteUserById
);

module.exports = router;
