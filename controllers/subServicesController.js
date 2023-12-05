// controllers/serviceSubCategoryController.js

const ServiceSubCategory = require('../models/service_Sub_Category');

const addServiceSubCategory = async (req, res) => {
  try {
    const { title, serviceCategory } = req.body;
    const serviceSubCategory = new ServiceSubCategory({ title, serviceCategory });
    await serviceSubCategory.save();
    return res.status(201).send({ success: true, message: 'Service sub-category added', data: serviceSubCategory });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const getAllServiceSubCategories = async (req, res) => {
  try {
    const serviceSubCategories = await ServiceSubCategory.find();
    return res.status(200).send({ success: true, data: serviceSubCategories });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const getServiceSubCategoryById = async (req, res) => {
  try {
    const serviceSubCategory = await ServiceSubCategory.findById(req.params.serviceSubCategoryId);
    if (!serviceSubCategory) {
      return res.status(404).send({ success: false, error: 'Service sub-category not found' });
    }
    return res.status(200).send({ success: true, data: serviceSubCategory });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const updateServiceSubCategory = async (req, res) => {
  try {
    const { title, serviceCategory } = req.body;
    const serviceSubCategory = await ServiceSubCategory.findByIdAndUpdate(
      req.params.serviceSubCategoryId,
      { title, serviceCategory },
      { new: true }
    );
    if (!serviceSubCategory) {
      return res.status(404).send({ success: false, error: 'Service sub-category not found' });
    }
    return res.status(200).send({ success: true, message: 'Service sub-category updated', data: serviceSubCategory });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const deleteServiceSubCategory = async (req, res) => {
  try {
    const serviceSubCategory = await ServiceSubCategory.findByIdAndDelete(req.params.serviceSubCategoryId);
    if (!serviceSubCategory) {
      return res.status(404).send({ success: false, error: 'Service sub-category not found' });
    }
    return res.status(200).send({ success: true, message: 'Service sub-category deleted', data: serviceSubCategory });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  addServiceSubCategory,
  getAllServiceSubCategories,
  getServiceSubCategoryById,
  updateServiceSubCategory,
  deleteServiceSubCategory,
};
