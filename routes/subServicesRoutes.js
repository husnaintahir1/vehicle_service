// routes/serviceSubCategoryRoutes.js

const express = require('express');
const {
  addServiceSubCategory,
  getAllServiceSubCategories,
  getServiceSubCategoryById,
  updateServiceSubCategory,
  deleteServiceSubCategory,
} = require('../controllers/subServicesController');

const router = express.Router();

router.post('/', addServiceSubCategory);

router.get('/', getAllServiceSubCategories);

router.get('/:serviceSubCategoryId', getServiceSubCategoryById);

router.put('/:serviceSubCategoryId', updateServiceSubCategory);

router.delete('/:serviceSubCategoryId', deleteServiceSubCategory);

module.exports = router;
