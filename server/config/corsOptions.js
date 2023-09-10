const { baseUrl } = require('../../constants');

const corsOptions = {
  origin: `${baseUrl.client}`,
  // credentials: true,
};

module.exports = corsOptions;
