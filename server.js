require('dotenv').config();
const express = require('express');
const connectDB = require('./configs/database');
const security = require('./middlewares/security');
var cors = require('cors');
const path = require('path');

const allRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors(security.corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
allRoutes(express, app);


connectDB().then(() => {
  console.log("Database Successdully Connected.!")
});

app.listen(3000, () => console.log('Server is running on port 3000'));