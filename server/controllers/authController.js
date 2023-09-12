const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  console.log('auth: handleLogin()');
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required' });

  //try to find user in db
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401);

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //.filter(Boolean) check
    const roles = Object.values(foundUser.roles);
    // console.log(roles);
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

    await User.updateOne(
      { username: foundUser.username },
      { refreshToken: refreshToken }
    ).exec();

    const userId = foundUser._id;
    res
      .cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie('userId', userId)
      .send({ userId, accessToken });
  } else {
    // passwords don't match
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
