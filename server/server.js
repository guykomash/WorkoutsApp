const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3080;
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// a Printing middlware - for debugging.
app.use(require('./middleware/printRequset'));

app.use('/register', require('./routes/registerRoute'));
app.use('/auth', require('./routes/authRoute'));
app.use('/refresh', require('./routes/refreshRoute'));
app.use('/logout', require('./routes/logoutRoute'));

app.use(verifyJWT); // from now on (waterfall..)
app.use('/workouts', require('./routes/workoutsRoute'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
