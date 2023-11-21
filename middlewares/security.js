const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { validationResult, check } = require('express-validator');

exports.corsOptions = {
  // Configure based on your requirements
  origin: '*',
  optionsSuccessStatus: 200
};

exports.rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.registrationValidator = [
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
];

exports.loginValidator = [
  check('email').isEmail(),
  check('password').exists()
];
