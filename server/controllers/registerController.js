const User = require('../models/User');

// hash passwords
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  console.log('handleNewUser');
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required' });

  // check for duplicates usernames in db (username registered is already exists.)
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); // 409 = Conflict

  try {
    //ecnrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10); // salt is 10.

    // Create and store new user
    const result = User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ message: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 - server error
  }
};

module.exports = { handleNewUser };
