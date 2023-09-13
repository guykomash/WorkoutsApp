const User = require('../models/User');

const getAccountDataByUser = async (req, res) => {
  console.log('getAccountDataByUser');
  const userId = req?.cookies?.userId;
  if (!userId)
    return res.status(500).json({ message: 'no userId found in request' });

  const foundUser = await User.findById(userId).exec();
  if (!foundUser)
    return res.status(500).json({ message: 'request userId dont exist id DB' });

  // request OK.
  console.log(foundUser);
  const firstName = foundUser?.name?.firstname;
  const lastName = foundUser?.name?.lastname;
  const userName = foundUser?.username;
  const created = foundUser?.created;
  res
    .status(200)
    .send({
      user: {
        userName,
        firstName,
        lastName,
        created,
      },
    })
    .end();
};

const fetchAllUsers = async (req, res) => {
  console.log('fetchAllUsers');
  const userId = req?.cookies?.userId;
  if (!userId)
    return res.status(500).json({ message: 'no userId found in request' });
  // request OK.
  const users = await User.find().exec();
  if (!users) {
    return res.status(204).send({ message: 'No workouts found' });
  } else {
    return res.status(200).send({ user }).end();
  }
};

const deleteUserById = async (req, res) => {
  console.log('deleteUser');
  const userId = req?.cookies?.userId;
  if (!userId)
    return res.status(500).json({ message: 'no userId found in request' });

  const deleteUserId = req?.params?.userId;
  if (!deleteUserId)
    return res.status(400).send({ message: 'bad delete user id' });

  if (deleteUserId === userId) {
    console.log('User cannot delete own account.');
    return res.status(400).send({ message: 'user cannot delete own account' });
  }

  //request OK.
  const foundUser = await User.findById(deleteUserId);
  if (!foundUser) return;
};

module.exports = { getAccountDataByUser, fetchAllUsers };
