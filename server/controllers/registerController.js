const usersDB = {
  users: require('../models/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require('fs').promises;
const path = require('path');

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
  const duplicate = usersDB.users.find((u) => u.username === user);
  if (duplicate) return res.sendStatus(409); // 409 = Conflict

  try {
    //ecnrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10); // salt is 10.

    // store new user
    const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedPwd,
    };
    usersDB.setUsers([...usersDB.users, newUser]);

    // save user in DB
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'users.json'),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ message: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 - server error
  }
};

module.exports = { handleNewUser };
