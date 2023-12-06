const express = require('express');
const {
  addServiceCategory,
  getAllServiceCategories,
  getServiceCategoryById,
  updateServiceCategory,
  deleteServiceCategory,
} = require('../controllers/serviceCategoriesController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/', upload.single('image'), addServiceCategory);
router.get('/', getAllServiceCategories);
router.get('/:serviceCategoryId', getServiceCategoryById);
router.put('/:serviceCategoryId', upload.single('image'), updateServiceCategory);
router.delete('/:serviceCategoryId', deleteServiceCategory);

module.exports = router;
