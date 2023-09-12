const User = require('../models/User');

const jwt = require('jsonwebtoken');

// grab refreshToken from cookies.
// grab user from DB by the refreshToken.
// verify refreshToken => sign new accessToken & send to user.
const handleRefreshToken = async (req, res) => {
  console.log('handleRefreshToken');
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  // console.log(refreshToken);

  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  // const foundUser = usersDB.users.find((u) => u.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403); // 403 = foribdden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { username: decoded.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    res.send({ accessToken });
  });
};

module.exports = { handleRefreshToken };
