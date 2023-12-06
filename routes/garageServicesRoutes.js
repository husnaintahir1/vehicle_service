
const express = require('express');
const {
  addGarageService,
  getAllGarageServices,
  getGarageServiceById,
  updateGarageService,
  deleteGarageService,
} = require('../controllers/garageServicesController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/',upload.single('image'), addGarageService);

router.get('/', getAllGarageServices);

router.get('/:garageServiceId', getGarageServiceById);

router.put('/:garageServiceId', upload.single('image'), updateGarageService);

router.delete('/:garageServiceId', deleteGarageService);

module.exports = router;
