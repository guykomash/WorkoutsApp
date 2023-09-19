const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  user_id: { type: ObjectId, required: true },
  title: { type: String },
  date: { type: String, required: true },
  exercises: [
    {
      exercise_id: { type: ObjectId, required: true },
      sets: [{ weight: String, reps: String, duration: String }],
      distance: String,
      duration: String,
    },
  ],
});

module.exports = mongoose.model('Session', sessionSchema);
