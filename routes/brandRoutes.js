const express = require('express');
const {
  addBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require('../controllers/brandsController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/',upload.single('image'), addBrand);

router.get('/', getAllBrands);

router.get('/:brandId', getBrandById);

router.put('/:brandId', upload.single('image'),updateBrand);

router.delete('/:brandId', deleteBrand);

module.exports = router;
