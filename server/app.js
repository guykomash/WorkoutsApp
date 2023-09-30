const express = require('express');
const app = express();

const workoutsRoutes = require('./routes/workoutsRoute');

app.use('/workouts', workoutsRoutes);

app.listen(3080, () => {
  console.log('Server started...');
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
