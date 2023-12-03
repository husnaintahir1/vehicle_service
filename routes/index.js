const errorHandler = require("../middlewares/errorHandler");
const isAuthenticated = require("../middlewares/isAuthenticated");
const logReqBody = require("../middlewares/logReqBody");
const security = require("../middlewares/security");
const authRoutes = require("./authRoutes");
const vehicleRoutes = require("./vehicleRoute");

function allRoutes(app){
    app.use("/api", logReqBody);
    app.use('/api/auth', security.rateLimiter, authRoutes);
    // define all public route before this middleware
    app.use(isAuthenticated);
    app.use('/api/vehicle', vehicleRoutes);

    app.use(errorHandler);
}


module.exports = allRoutes;