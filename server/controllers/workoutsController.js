const Workout = require('../models/Workout');
const User = require('../models/User');

const { format } = require('date-fns');
const { ObjectId } = require('mongodb');

const fetchAll = async (req, res) => {
  console.log('workouts fetchAll');
  const userId = req?.cookies.userId;
  if (!userId)
    return res.status(500).json({ message: 'no userId found in request' });

  const Workouts = await Workout.find().exec();
  if (!Workouts) {
    return res.status(204).send({ message: 'No workouts found' });
  } else {
    return res.status(200).send({ Workouts }).end();
  }
};

const fetchById = async (req, res) => {
  console.log('workout fetchById');
  const userId = req?.cookies.userId;
  if (!userId)
    return res.status(500).json({ message: 'no userId found in request' });

  const workoutId = req.params.workoutId;
  if (!workoutId)
    return res.status(400).json({ message: 'workout id is required' });

  const foundWorkout = await Workout.findById(workoutId).exec();
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

  // request is OK.

  const id = foundUser._id;
  const Workouts = await Workout.find({ user_id: id }).exec();
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

  const loggedInUser = await User.findById(userId);
  if (!loggedInUser)
    return res.status(500).json({ message: 'request userId dont exist id DB' });

  // request is OK.

  const foundWorkout = await Workout.findOneAndDelete({
    _id: workoutId,
  }).exec();
  if (!foundWorkout)
    return res
      .status(400)
      .json({ message: 'Workout was not found - Bad ID' })
      .send();

  // for re-rendering, return updated Workouts for the user.
  const id = foundUser._id;
  const Workouts = await Workout.find({ user_id: id }).exec();
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

  //request is OK.

  //find user in DB.
  const foundUser = await User.findById(userId);
  if (!foundUser)
    return res.status(500).json({ message: 'request userId dont exist id DB' });

  const { firstname, lastname } = foundUser.name;

  console.log(workout);
  const { title, exercises } = workout;

  await Workout.create({
    user_id: new ObjectId(userId),
    author: { firstname, lastname },
    title: title,
    lastUpdated: format(new Date(), 'dd/MM/YYY pp'),
    exercises: exercises,
  });

  // for re-rendering, return updated Workouts for the user.
  const id = foundUser._id;
  const Workouts = await Workout.find({ user_id: id }).exec();
  if (!Workouts) {
    return res.status(500).json({ message: 'err while workouts fetchAll' });
  } else {
    return res.status(200).send({ Workouts }).end();
  }
};

const updateById = async (req, res) => {
  console.log('workout updateById');
  const userId = req?.cookies.userId;
  const { workout } = req.body;
  const workoutId = req.params.workoutId;

  if (!userId)
    return res.status(500).json({ message: 'no userId found in request' });

  if (!workout) {
    return res.status(400).json({ message: 'bad workout body request' }).end();
  }
  if (!workoutId)
    return res.status(400).json({ message: 'bad workout id request' });

  // request is ok.

  if (workout.user_id !== userId) {
    console.log('user trying to update others workout');
    return res.status(400).json({ message: 'workout dont belong to user' });
  }

  // find user in DB.
  const foundUser = await User.findById(userId).exec();
  if (!foundUser)
    return res
      .status(500)
      .json({ message: `request userId don't exist in DB` });

  // update workout in DB.
  const result = await Workout.updateOne(
    { _id: workoutId },
    {
      title: workout.title,
      exercises: workout.exercises,
      lastUpdated: format(new Date(), 'dd/MM/YYY pp'),
    }
  ).exec();
  console.log(result);

  // for re-rendering, return updated Workouts for the user.
  const id = foundUser._id;
  const Workouts = await Workout.find({ user_id: id }).exec();
  if (!Workouts) {
    return res.status(500).json({ message: 'err while workouts fetchAll' });
  } else {
    return res.status(200).send({ Workouts }).end();
  }
};

module.exports = {
  fetchAll,
  fetchById,
  addWorkout,
  deleteById,
  fetchByUser,
  updateById,
};
