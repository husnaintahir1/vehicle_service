
const express = require('express');
const {
  addGarageService,
  getAllGarageServices,
  getGarageServiceById,
  updateGarageService,
  deleteGarageService,
} = require('../controllers/garageServicesController');

const router = express.Router();

router.post('/', addGarageService);

router.get('/', getAllGarageServices);

router.get('/:garageServiceId', getGarageServiceById);

router.put('/:garageServiceId', updateGarageService);

router.delete('/:garageServiceId', deleteGarageService);

module.exports = router;
