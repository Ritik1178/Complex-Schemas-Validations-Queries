const Vehicle = require('../models/Vehicle');

// Vehicle CRUD Operations
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }
    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Trip Operations
exports.addTrip = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }
    vehicle.trips.push(req.body);
    await vehicle.save();
    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }
    const trip = vehicle.trips.id(req.params.tripId);
    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }
    Object.assign(trip, req.body);
    await vehicle.save();
    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        error: 'Vehicle not found'
      });
    }
    vehicle.trips.pull(req.params.tripId);
    await vehicle.save();
    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Advanced Queries
exports.getVehiclesWithLongTrips = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      'trips.distance': { $gt: 200 }
    });
    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getVehiclesFromCities = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      'trips.startLocation': { $in: ['Delhi', 'Mumbai', 'Bangalore'] }
    });
    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getVehiclesAfterDate = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      'trips.startTime': { $gte: new Date('2024-01-01') }
    });
    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getVehiclesByType = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      type: { $in: ['car', 'truck'] }
    });
    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}; 