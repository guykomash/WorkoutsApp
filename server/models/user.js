const { ObjectId } = require('mongodb');
const { getDB } = require('../database/mongoDB');

const saveUser = (user, cb) => {
  const db = getDB();
  db.collection('users')
    .insertOne(user)
    .then(() => fetchAllUsers(cb))
    .catch((err) => console.error(err));
};

const fetchAllUsers = (cb) => {
  const db = getDB();
  db.collection('users')
    .find()
    .toArray()
    .then((users) => cb(users))
    .catch((err) => console.error(err));
};

const fetchUserById = (userId, cb) => {
  const db = getDB();
  db.collection('users')
    .findOne({ _id: new ObjectId(userId) })
    .then((user) => {
      cb(user);
    })
    .catch((err) => console.error(err));
};

module.exports = { saveUser, fetchAllUsers, fetchUserById };
