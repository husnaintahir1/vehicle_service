const { addVehicle } = require("../controllers/vehicleController");

const router = require("express").Router();



router.route("/").post(addVehicle)


module.exports = router;