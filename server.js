require('dotenv').config();
const express = require('express');
const connectDB = require('./configs/database');
const security = require('./middlewares/security');
var cors = require('cors');

const allRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors(security.corsOptions));

allRoutes(app)


connectDB().then(() => {
  console.log("Database Successdully Connected.!")
});

app.listen(3000, () => console.log('Server is running on port 3000'));