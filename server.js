const express = require('express');
const connectDB = require('./configs/database');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const security = require('./middlewares/security');
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors(security.corsOptions));
app.use('/auth', security.rateLimiter, authRoutes);
app.use(errorHandler);

connectDB().then(() => {
    app.listen(3000, () => console.log('Server is running on port 3000'));
  });