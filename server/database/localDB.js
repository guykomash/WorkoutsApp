const fs = require('fs');
const path = require('path');
const { rootDir } = require('../../constants');
const workoutsDBPath = path.join(rootDir, 'data', 'workoutsDB.json');

const saveWorkoutToFile = (workout, cb) => {
  console.log('Save');
  let workouts = [];
  fs.readFile(workoutsDBPath, (err, data) => {
    if (err) throw err;
    if (data.length) {
      workouts = JSON.parse(data);
    }
    workouts.push(workout);

    fs.writeFile(workoutsDBPath, JSON.stringify(workouts), (err) => {
      if (err) throw err;
    });

    cb(workouts);
  });
};

const fetchSingleWorkoutsFromFile = (id, cb) => {
  let workout = {};
  fs.readFile(workoutsDBPath, (err, data) => {
    if (err) throw err;
    if (data.length) {
      workout = JSON.parse(data).find((w) => w.id === id);
      cb(workout);
    }
  });
};

const fetchWorkoutsFromFile = (cb) => {
  let workouts = [];
  fs.readFile(workoutsDBPath, (err, data) => {
    if (err) throw err;
    if (data.length) {
      workouts = JSON.parse(data);
    }

    cb(workouts);
  });
};

const deleteWorkoutFromFile = (id, cb) => {
  let workouts = [];
  fs.readFile(workoutsDBPath, (err, data) => {
    if (err) throw err;
    if (data.length) {
      workouts = JSON.parse(data);
    }
    workouts = workouts.filter((w) => w.id != id);
    console.log(workouts);

    fs.writeFile(workoutsDBPath, JSON.stringify(workouts), (err) => {
      if (err) throw err;
    });

    cb(workouts);
  });
};

module.exports = {
  save: saveWorkoutToFile,
  fetch: fetchSingleWorkoutsFromFile,
  fetchAll: fetchWorkoutsFromFile,
  remove: deleteWorkoutFromFile,
};
