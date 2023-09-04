const express = require('express');
const app = express();

const { Workouts } = require('./models/Workouts');

const { baseUrl } = require('../constants');

const cors = require('cors');
const corsOptions = {
  origin: `${baseUrl.client}`,
  credentials: true,
};
app.use(cors());
app.use(express.json());

app.get('/workouts', cors(corsOptions), (req, res) => {
  console.log('server get/workouts');
  console.log(Workouts);
  res.send({ Workouts });
});

app.get('/workouts/:workoutId', cors(corsOptions), (req, res) => {
  const { workoutId } = req.params;
  const workout = Workouts.find((workout) => workout.id === workoutId);
  if (!workout) {
    return res.status(400).json({ message: 'workout not found' }).end();
  }
  res.send({ workout });
});

app.listen(3080, () => {
  console.log('Server started...');
});
