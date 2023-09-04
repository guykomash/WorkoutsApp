const Workouts = [
  {
    id: '1',
    title: 'Basic Workout',
    user: 'Guy Komash',
    lastUpdated: '04/09/2023',
    exercises: [
      { title: 'Bench Press', sets: '3', reps: '8,8,9' },
      { title: 'Lat Pulldown', sets: '3', reps: '10,8,6' },
    ],
  },
  {
    id: '2',
    title: 'Advance Workout',
    user: 'Nadav Komash',
    lastUpdated: '04/09/2023',
    exercises: [
      { title: 'Bench Press', sets: '3', reps: '8,8,9' },
      { title: 'Lat Pulldown', sets: '3', reps: '10,8,6' },
      { title: 'Squat', sets: '5', reps: '20,20,20' },
      { title: 'Lateral Rises', sets: '4', reps: '7,7,7' },
    ],
  },
];

module.exports = { Workouts };
