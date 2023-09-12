const Workout = require('../models/Workout');
const User = require('../models/User');

const { format } = require('date-fns');

const fetchAll = async (req, res) => {
  console.log('workouts fetchAll');

  const Workouts = await Workout.find().exec();
  if (!Workouts) {
    return res.status(500).json({ message: 'err while workouts fetchAll' });
  } else {
    return res.status(200).send({ Workouts }).end();
  }
};

const fetchById = async (req, res) => {
  const workoutId = req.params.workoutId;
  if (!workoutId)
    return res.status(400).json({ message: 'workout id is required' });

  const foundWorkout = await Workout.findById(workoutId).exec();
  console.log(foundWorkout);
  if (!foundWorkout) {
    return res
      .status(400)
      .json({ message: 'Workout was not found - Bad ID' })
      .send();
  } else {
    return res.status(200).json({ workout: foundWorkout }).end();
  }
};

const fetchByUser = async (req, res) => {
  console.log('workouts fetchByUser');
  const userId = req?.cookies.userId;
  if (!userId)
    return res.status(500).json({ message: 'no userId found in request' });

  const foundUser = await User.findById(userId);
  if (!foundUser)
    return res.status(500).json({ message: 'request userId dont exist id DB' });

  const name = foundUser.username;

  const Workouts = await Workout.find({ user: name }).exec();
  if (!Workouts) {
    return res.status(500).json({ message: 'err while workouts fetchAll' });
  } else {
    return res.status(200).send({ Workouts }).end();
  }
};

const deleteById = async (req, res) => {
  const userId = req?.cookies.userId;
  if (!userId)
    return res.status(500).json({ message: 'no userId found in request' });

  const workoutId = req.params.workoutId;
  if (!workoutId)
    return res.status(400).json({ message: 'workout id is required' });

  const foundWorkout = await Workout.findOneAndDelete({
    _id: workoutId,
  }).exec();
  if (!foundWorkout)
    return res
      .status(400)
      .json({ message: 'Workout was not found - Bad ID' })
      .send();

  // return Workouts for the user for re-rendering...
  const foundUser = await User.findById(userId);
  if (!foundUser)
    return res.status(500).json({ message: 'request userId dont exist id DB' });

  const name = foundUser.username;

  const Workouts = await Workout.find({ user: name }).exec();
  if (!Workouts) {
    return res.status(500).json({ message: 'err while workouts fetchAll' });
  } else {
    return res.status(200).send({ Workouts }).end();
  }
};

const addWorkout = async (req, res) => {
  const userId = req?.cookies.userId;
  if (!userId)
    return res.status(500).json({ message: 'no userId found in request' });
  const { workout } = req.body;
  if (!workout) {
    return res.status(400).json({ message: 'bad add Workout request' }).end();
  }
  const foundUser = await User.findById(userId);
  if (!foundUser)
    return res.status(500).json({ message: 'request userId dont exist id DB' });

  const name = foundUser.username;
  console.log(workout);
  const { title, exercises } = workout;

  await Workout.create({
    user: name,
    title: title,
    lastUpdated: format(new Date(), 'dd/MM/YYY pp'),
    exercises: exercises,
  });

  // return Workouts for the user for re-rendering...

  const Workouts = await Workout.find({ user: name }).exec();
  if (!Workouts) {
    return res.status(500).json({ message: 'err while workouts fetchAll' });
  } else {
    return res.status(200).send({ Workouts }).end();
  }
};

module.exports = { fetchAll, fetchById, addWorkout, deleteById, fetchByUser };
