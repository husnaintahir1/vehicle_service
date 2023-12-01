const cors = require('cors');
const rateLimit = require('express-rate-limit');

exports.corsOptions = {
  // Configure based on your requirements
  origin: '*',
  optionsSuccessStatus: 200
};

exports.rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
