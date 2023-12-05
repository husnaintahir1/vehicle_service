// routes/garageRoutes.js

const express = require('express');
const {
  addGarage,
  getAllGarages,
  getGarageById,
  updateGarage,
  deleteGarage,
} = require('../controllers/garageController');

const router = express.Router();

router.post('/', addGarage);

router.get('/', getAllGarages);

router.get('/:garageId', getGarageById);

router.put('/:garageId', updateGarage);

router.delete('/:garageId', deleteGarage);

module.exports = router;
