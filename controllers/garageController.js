// controllers/garageController.js

const Garage = require('../models/garages');

const addGarage = async (req, res) => {
  try {
    const { title, timing, location, services, phoneNumber } = req.body;
    const garage = new Garage({ title, timing, location, services, phoneNumber });
    await garage.save();
    return res.status(201).send({ success: true, message: 'Garage added', data: garage });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const getAllGarages = async (req, res) => {
  try {
    const garages = await Garage.find();
    return res.status(200).send({ success: true, data: garages });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const getGarageById = async (req, res) => {
  try {
    const garage = await Garage.findById(req.params.garageId);
    if (!garage) {
      return res.status(404).send({ success: false, error: 'Garage not found' });
    }
    return res.status(200).send({ success: true, data: garage });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const updateGarage = async (req, res) => {
  try {
    const { title, timing, location, services, phoneNumber } = req.body;
    const garage = await Garage.findByIdAndUpdate(req.params.garageId, { title, timing, location, services, phoneNumber }, { new: true });
    if (!garage) {
      return res.status(404).send({ success: false, error: 'Garage not found' });
    }
    return res.status(200).send({ success: true, message: 'Garage updated', data: garage });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const deleteGarage = async (req, res) => {
  try {
    const garage = await Garage.findByIdAndDelete(req.params.garageId);
    if (!garage) {
      return res.status(404).send({ success: false, error: 'Garage not found' });
    }
    return res.status(200).send({ success: true, message: 'Garage deleted', data: garage });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  addGarage,
  getAllGarages,
  getGarageById,
  updateGarage,
  deleteGarage,
};
