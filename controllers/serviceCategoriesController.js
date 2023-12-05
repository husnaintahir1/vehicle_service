// controllers/serviceCategoriesController.js

const ServiceCategory = require('../models/service_categories');

const addServiceCategory = async (req, res) => {
  try {
    const { title, image } = req.body;
    const serviceCategory = new ServiceCategory({ title, image });
    await serviceCategory.save();
    return res.status(201).send({ success: true, message: 'Service category added', data: serviceCategory });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const getAllServiceCategories = async (req, res) => {
  try {
    const serviceCategories = await ServiceCategory.find();
    return res.status(200).send({ success: true, data: serviceCategories });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const getServiceCategoryById = async (req, res) => {
  try {
    const serviceCategory = await ServiceCategory.findById(req.params.serviceCategoryId);
    if (!serviceCategory) {
      return res.status(404).send({ success: false, error: 'Service category not found' });
    }
    return res.status(200).send({ success: true, data: serviceCategory });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const updateServiceCategory = async (req, res) => {
  try {
    const { title, image } = req.body;
    const serviceCategory = await ServiceCategory.findByIdAndUpdate(req.params.serviceCategoryId, { title, image }, { new: true });
    if (!serviceCategory) {
      return res.status(404).send({ success: false, error: 'Service category not found' });
    }
    return res.status(200).send({ success: true, message: 'Service category updated', data: serviceCategory });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const deleteServiceCategory = async (req, res) => {
  try {
    const serviceCategory = await ServiceCategory.findByIdAndDelete(req.params.serviceCategoryId);
    if (!serviceCategory) {
      return res.status(404).send({ success: false, error: 'Service category not found' });
    }
    return res.status(200).send({ success: true, message: 'Service category deleted', data: serviceCategory });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  addServiceCategory,
  getAllServiceCategories,
  getServiceCategoryById,
  updateServiceCategory,
  deleteServiceCategory,
};
