require('dotenv').config();
const express = require('express');
const connectDB = require('./configs/database');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const security = require('./middlewares/security');
var cors = require('cors');
const { logReqBody } = require('./middlewares/logReqBody');

const app = express();

app.use(express.json());
app.use(cors(security.corsOptions));
app.use("/api", logReqBody);


app.use('/api/auth', security.rateLimiter, authRoutes);
app.use(errorHandler);

connectDB().then(() => {
  console.log("Database Successdully Connected.!")
});

app.listen(3000, () => console.log('Server is running on port 3000'));