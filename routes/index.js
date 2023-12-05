const errorHandler = require("../middlewares/errorHandler");
const isAuthenticated = require("../middlewares/isAuthenticated");
const logReqBody = require("../middlewares/logReqBody");
const security = require("../middlewares/security");
const authRoutes = require("./authRoutes");
const vehicleRoutes = require("./vehicleRoute");
const brandRoutes = require('./brandRoutes')
const serviceCategories = require('./serviceCategoriesRoutes')
const subServices= require('./subServicesRoutes')
const garage = require('./garageRoutes')
const garageService = require('./garageServicesRoutes')

function allRoutes(app){
    app.use("/api", logReqBody);
    app.use('/api/auth', security.rateLimiter, authRoutes);
    // define all public route before this middleware
    app.use(isAuthenticated);
    app.use('/api/vehicle', vehicleRoutes);
    app.use('/api/brands', brandRoutes);
    app.use('/api/serviceCategory', serviceCategories);
    app.use('/api/subServiceCategories', subServices);
    app.use('/api/garage',garage)
    
    app.use('/api/garageService',garageService)

    
    app.use(errorHandler);
}


module.exports = allRoutes;