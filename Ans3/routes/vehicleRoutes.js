const express = require('express');
const router = express.Router();
const {
  createVehicle,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
  addTrip,
  updateTrip,
  deleteTrip,
  getVehiclesWithLongTrips,
  getVehiclesFromCities,
  getVehiclesAfterDate,
  getVehiclesByType
} = require('../controllers/vehicleController');

// Vehicle CRUD routes
router.post('/', createVehicle);
router.get('/', getAllVehicles);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

// Trip operation routes
router.post('/:id/trips', addTrip);
router.put('/:id/trips/:tripId', updateTrip);
router.delete('/:id/trips/:tripId', deleteTrip);

// Advanced query routes
router.get('/long-trips', getVehiclesWithLongTrips);
router.get('/from-cities', getVehiclesFromCities);
router.get('/after-date', getVehiclesAfterDate);
router.get('/by-type', getVehiclesByType);

module.exports = router; 