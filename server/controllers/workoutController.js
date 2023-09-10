const workoutsDB = {
  workouts: require('../models/workouts.json'),
  setWorkouts: function (data) {
    this.workouts = data;
  },
};

const fsPromises = require('fs').promises;
const path = require('path');

const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

const fetchAll = async (req, res) => {
  console.log('workouts fetchAll');
  try {
    const workouts = workoutsDB.workouts;
    if (workouts) {
      return res.status(200).send({ Workouts: workouts }).end();
    }
  } catch (err) {
    return res.status(500).json({ message: 'err while workouts fetchAll' });
  }
};

const fetchById = async (req, res) => {
  const workoutId = req.params.workoutId;
  if (!workoutId)
    return res.status(400).json({ message: 'workout id is required' });

  const foundWorkout = workoutsDB.workouts.find((w) => w.id === workoutId);
  if (!foundWorkout) {
    return res
      .status(400)
      .json({ message: 'Workout was not found - Bad ID' })
      .send();
  } else {
    return res.status(200).json({ workout: foundWorkout }).end();
  }
};

const save = async (req, res) => {
  const { workout } = req.body;
  if (!workout) {
    return res.status(400).json({ message: 'bad add Workout request' }).end();
  }

  const { title, user, exercises } = workout;

  const newWorkout = {
    id: uuidv4(),
    title: title,
    user: user,
    userId: 'req.user._id',
    lastUpdated: format(new Date(), 'dd/MM/YYY pp'),
    exercises: exercises,
  };
  workoutsDB.setWorkouts([...workoutsDB.workouts, newWorkout]);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'workouts.json'),
      JSON.stringify(workoutsDB.workouts)
    );
    return res.send({ Workouts: workoutsDB.workouts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { fetchAll, fetchById, save };
