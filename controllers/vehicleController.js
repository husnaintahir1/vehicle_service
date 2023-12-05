const Vehicle = require("../models/vehicle");
const { validateAddVehicle, validateUpdateVehicle } = require("../validations/vehicleValidation");

const addVehicle = async (req, res) => {
    try {
        const { error } = validateAddVehicle(req.body);
        if (error) {
            return res.status(400).send({ success: false, error: error.details[0].message });
        }

        const userId = req.user.userId;
        const vehicle = new Vehicle({ ...req.body, addedBy: userId });
        await vehicle.save();

        return res.status(201).send({ success: true, message: "Vehicle added", data: vehicle });
    } catch (error) {
        if (error && error.code === 11000 && error.keyValue && error.keyValue.carNumber) {
            return res.status(400).send({ success: false, error: "Vehicle already added" });
        }
        return res.status(500).send({ success: false, error: error.message });
    }
}

const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        return res.status(200).send({ success: true, data: vehicles });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}

const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.vehicleId);
        if (!vehicle) {
            return res.status(404).send({ success: false, error: "Vehicle not found" });
        }
        return res.status(200).send({ success: true, data: vehicle });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}

const updateVehicle = async (req, res) => {
    try {
        const { error } = validateUpdateVehicle(req.body);
        if (error) {
            return res.status(400).send({ success: false, error: error.details[0].message });
        }

        const vehicle = await Vehicle.findByIdAndUpdate(req.params.vehicleId, req.body, { new: true });
        if (!vehicle) {
            return res.status(404).send({ success: false, error: "Vehicle not found" });
        }

        return res.status(200).send({ success: true, message: "Vehicle updated", data: vehicle });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}

const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.vehicleId);
        if (!vehicle) {
            return res.status(404).send({ success: false, error: "Vehicle not found" });
        }

        return res.status(200).send({ success: true, message: "Vehicle deleted", data: vehicle });
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}

module.exports = {
    addVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
};
