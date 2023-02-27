require('dotenv').config();
const rateLimit = require('express-rate-limit');

const { NODE_ENV } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: NODE_ENV === 'production' ? 10 : 1000,
});

module.exports = limiter;
