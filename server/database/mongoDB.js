const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    'mongodb+srv://workoutsAdmin:workoutsAdmin@cluster0.kj8msh7.mongodb.net/WorkoutsDB?retryWrites=true&w=majority'
  )
    .then((client) => {
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const getDB = () => {
  if (_db) return _db;
  throw 'No data base found';
};




module.exports = { mongoConnect, getDB };
