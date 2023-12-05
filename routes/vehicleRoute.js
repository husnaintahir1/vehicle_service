const { addVehicle, getAllVehicles, getVehicleById, updateVehicle, deleteVehicle } = require("../controllers/vehicleController");

const router = require("express").Router();

// Create a new vehicle
router.route("/").post(addVehicle);

// Get all vehicles
router.route("/").get(getAllVehicles);

// Get a specific vehicle by ID
router.route("/:vehicleId").get(getVehicleById);

// Update a vehicle by ID
router.route("/:vehicleId").put(updateVehicle);

// Delete a vehicle by ID
router.route("/:vehicleId").delete(deleteVehicle);

module.exports = router;
