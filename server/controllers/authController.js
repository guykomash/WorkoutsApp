const usersDB = {
  users: require('../models/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs/promises');
const path = require('path');

const handleLogin = async (req, res) => {
  console.log('auth: handleLogin()');
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required' });

  //try to find user in db
  const foundUser = usersDB.users.find((u) => u.username === user);
  if (!foundUser) return res.sendStatus(401);

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //.filter(Boolean) check
    const roles = Object.values(foundUser.roles);
    console.log(roles);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    //updating DB users: update the logged in user with his refreshToken

    const otherUsers = usersDB.users.filter(
      (u) => u.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'users.json'),
      JSON.stringify(usersDB.users)
    );

    res
      .cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .send({ roles, accessToken });
  } else {
    // passwords don't match
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
