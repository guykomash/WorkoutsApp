const express = require('express');
const app = express();

const workoutsRoutes = require('./routes/workoutsRoute');
app.use('/workouts', workoutsRoutes);

const { mongoConnect } = require('./database/mongoDB');

mongoConnect(() => {
  console.log('Connected to MongoDB');
  app.listen(3080, () => {
    console.log('Server running on port 3080');
  });
});

// const { baseUrl } = require('../constants');

// const cors = require('cors');
// const bodyParser = require('body-parser');

// const corsOptions = {
//   origin: `${baseUrl.client}`,
//   credentials: true,
// };

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded());
