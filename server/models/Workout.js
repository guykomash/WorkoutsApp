const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: String, required: true },
  lastUpdated: { type: String, required: true },
  exercises: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      sets: { type: String, required: true },
      reps: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Workout', workoutSchema);
