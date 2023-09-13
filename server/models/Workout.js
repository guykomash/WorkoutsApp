const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  user_id: { type: ObjectId, required: true },
  author: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  },
  title: { type: String, required: true },
  lastUpdated: { type: String, required: true },
  exercises: [
    {
      title: { type: String, required: true },
      sets: { type: String, required: true },
      reps: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Workout', workoutSchema);
