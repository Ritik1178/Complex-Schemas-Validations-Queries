# Vehicle Trip Management System

A RESTful API for managing vehicles and their trips using Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run dev
```

## API Endpoints

### Vehicle CRUD Operations

1. Create a new vehicle
```http
POST /api/v1/vehicles
```

2. Get all vehicles
```http
GET /api/v1/vehicles
```

3. Update a vehicle
```http
PUT /api/v1/vehicles/:id
```

4. Delete a vehicle
```http
DELETE /api/v1/vehicles/:id
```

### Trip Operations

1. Add a new trip to a vehicle
```http
POST /api/v1/vehicles/:id/trips
```

2. Update a trip
```http
PUT /api/v1/vehicles/:id/trips/:tripId
```

3. Delete a trip
```http
DELETE /api/v1/vehicles/:id/trips/:tripId
```

### Advanced Queries

1. Get vehicles with trips longer than 200 km
```http
GET /api/v1/vehicles/long-trips
```

2. Get vehicles with trips from specific cities
```http
GET /api/v1/vehicles/from-cities
```

3. Get vehicles with trips after Jan 1, 2024
```http
GET /api/v1/vehicles/after-date
```

4. Get vehicles of type car or truck
```http
GET /api/v1/vehicles/by-type
```

## Vehicle Schema

```javascript
{
  registrationNumber: String (required, unique),
  type: String (enum: ['car', 'truck', 'bike'], required),
  model: String (required),
  isActive: Boolean (default: true),
  trips: [{
    startLocation: String (required),
    endLocation: String (required),
    distance: Number (required, > 0),
    startTime: Date (required),
    endTime: Date (required)
  }]
}
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid ObjectIds
- Duplicate registration numbers
- Validation errors
- Server errors

All errors return appropriate HTTP status codes and meaningful error messages. 