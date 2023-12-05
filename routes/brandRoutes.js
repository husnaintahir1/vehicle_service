const express = require('express');
const {
  addBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require('../controllers/brandsController');

const router = express.Router();

router.post('/', addBrand);

router.get('/', getAllBrands);

router.get('/:brandId', getBrandById);

router.put('/:brandId', updateBrand);

router.delete('/:brandId', deleteBrand);

module.exports = router;
