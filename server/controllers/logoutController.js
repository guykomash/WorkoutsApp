const usersDB = {
  users: require('../models/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require('fs/promises');
const path = require('path');

const handleLogout = async (req, res) => {
  // * delete the accessToken on client-side!

  console.log('handleLogout');

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no cookie to delete , OK.

  const refreshToken = cookies.jwt;
  // grab user from DB by refreshToken
  const foundUser = usersDB.users.find((u) => u.refreshToken === refreshToken);
  if (!foundUser) {
    // found cookie , but no user in db => only clearCookie
    return res.clearCookie('jwt', { httpOnly: true }).sendStatus(403);
  }

  // delete refreshToken in DB , clearCookie
  const otherUsers = usersDB.users.filter(
    (u) => u.refreshToken !== foundUser.refreshToken
  );
  // update DB with user cleared refreshToken
  const currentUser = { ...foundUser, refreshToken: '' };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, '..', 'models', 'users.json'),
    JSON.stringify(usersDB.users)
  );

  //secure:true = > only serves on https => add in production

  res
    .clearCookie('jwt', {
      httpOnly: true,
    })
    .sendStatus(204);
};

module.exports = { handleLogout };
