const express = require('express');
const {
  addServiceCategory,
  getAllServiceCategories,
  getServiceCategoryById,
  updateServiceCategory,
  deleteServiceCategory,
} = require('../controllers/serviceCategoriesController');

const router = express.Router();

router.post('/', addServiceCategory);
router.get('/', getAllServiceCategories);
router.get('/:serviceCategoryId', getServiceCategoryById);
router.put('/:serviceCategoryId', updateServiceCategory);
router.delete('/:serviceCategoryId', deleteServiceCategory);

module.exports = router;
