const Brands = require('../models/brands');

const addBrand = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const brand = new Brands({ title, image });
    await brand.save();
    return res.status(201).send({ success: true, message: 'Brand added', data: brand });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brands.find();
    return res.status(200).send({ success: true, data: brands });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const getBrandById = async (req, res) => {
  try {
    const brand = await Brands.findById(req.params.brandId);
    if (!brand) {
      return res.status(404).send({ success: false, error: 'Brand not found' });
    }
    return res.status(200).send({ success: true, data: brand });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const brand = await Brands.findByIdAndUpdate(req.params.brandId, { title, image }, { new: true });
    if (!brand) {
      return res.status(404).send({ success: false, error: 'Brand not found' });
    }
    return res.status(200).send({ success: true, message: 'Brand updated', data: brand });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await Brands.findByIdAndDelete(req.params.brandId);
    if (!brand) {
      return res.status(404).send({ success: false, error: 'Brand not found' });
    }
    return res.status(200).send({ success: true, message: 'Brand deleted', data: brand });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  addBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
