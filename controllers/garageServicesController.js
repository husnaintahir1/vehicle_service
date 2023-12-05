// controllers/garageServiceController.js

const GarageService = require('../models/garage_services');

const addGarageService = async (req, res) => {
  try {
    const {
      title,
      timing,
      specification,
      included,
      price,
      garage,
      serviceSubCategory,
      serviceCategory,
    } = req.body;

    const garageService = new GarageService({
      title,
      timing,
      specification,
      included,
      price,
      garage,
      serviceSubCategory,
      serviceCategory,
    });

    await garageService.save();

    return res.status(201).send({ success: true, message: 'Garage service added', data: garageService });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const getAllGarageServices = async (req, res) => {
  try {
    const garageServices = await GarageService.find();
    return res.status(200).send({ success: true, data: garageServices });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const getGarageServiceById = async (req, res) => {
  try {
    const garageService = await GarageService.findById(req.params.garageServiceId);
    if (!garageService) {
      return res.status(404).send({ success: false, error: 'Garage service not found' });
    }
    return res.status(200).send({ success: true, data: garageService });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const updateGarageService = async (req, res) => {
  try {
    const {
      title,
      timing,
      specification,
      included,
      price,
      garage,
      serviceSubCategory,
      serviceCategory,
    } = req.body;

    const garageService = await GarageService.findByIdAndUpdate(
      req.params.garageServiceId,
      {
        title,
        timing,
        specification,
        included,
        price,
        garage,
        serviceSubCategory,
        serviceCategory,
      },
      { new: true }
    );

    if (!garageService) {
      return res.status(404).send({ success: false, error: 'Garage service not found' });
    }

    return res.status(200).send({ success: true, message: 'Garage service updated', data: garageService });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const deleteGarageService = async (req, res) => {
  try {
    const garageService = await GarageService.findByIdAndDelete(req.params.garageServiceId);
    if (!garageService) {
      return res.status(404).send({ success: false, error: 'Garage service not found' });
    }
    return res.status(200).send({ success: true, message: 'Garage service deleted', data: garageService });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  addGarageService,
  getAllGarageServices,
  getGarageServiceById,
  updateGarageService,
  deleteGarageService,
};
