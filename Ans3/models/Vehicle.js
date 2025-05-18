const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  startLocation: {
    type: String,
    required: [true, 'Start location is required']
  },
  endLocation: {
    type: String,
    required: [true, 'End location is required']
  },
  distance: {
    type: Number,
    required: [true, 'Distance is required'],
    validate: {
      validator: function(value) {
        return value > 0;
      },
      message: 'Distance must be greater than 0'
    }
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required']
  }
});

const vehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: [true, 'Registration number is required'],
    unique: true
  },
  type: {
    type: String,
    required: [true, 'Vehicle type is required'],
    enum: {
      values: ['car', 'truck', 'bike'],
      message: 'Vehicle type must be either car, truck, or bike'
    }
  },
  model: {
    type: String,
    required: [true, 'Model is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  trips: [tripSchema]
});

// Custom instance method to calculate total distance
vehicleSchema.methods.totalDistance = function() {
  return this.trips.reduce((total, trip) => total + trip.distance, 0);
};

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle; 