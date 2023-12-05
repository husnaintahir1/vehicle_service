const Vehicle = require("../models/vehicle");
const { validateAddVehicle } = require("../validations/vehicleValidation");

const addVehicle = async (req, res) => {
    try {
        const { error } = validateAddVehicle(req.body);
        if(error){
            return res.status(400).send({ success: false, error: error.details[0].message });
        }

        const userId = req.user.userId;
        const vehicle = new Vehicle({ ...req.body, addedBy: userId });
        await vehicle.save();

        return res.status(201).send({ success: true, message: "vehicle added", data: vehicle });
    } catch (error) {
        if (error && error.code === 11000 && error.keyValue && error.keyValue.carNumber){
            return res.status(400).send({ success: false, error: "Vehicle already added" });
        }
        return res.status(500).send({ success: false, error: error });
    }
}

module.exports = {
    addVehicle,
}