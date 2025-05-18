# User & Address Management System

A Node.js backend system for managing users and their addresses using Express and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running on your system

3. Start the server:
```bash
npm run dev
```

## API Endpoints

### Create a new user
- **POST** `/api/users`
- Body:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25
}
```

### Add a new address for a user
- **POST** `/api/users/:userId/address`
- Body:
```json
{
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
}
```

### Get users summary
- **GET** `/api/users/summary`
- Returns:
  - Total number of users
  - Total number of addresses
  - List of users with their name and address count

### Get user details with addresses
- **GET** `/api/users/:userId`

### Delete a specific address (Bonus)
- **DELETE** `/api/users/:userId/address/:addressId`

## Features

- Input validation for all fields
- Email format validation
- Pincode validation (6 digits)
- Default country set to India
- Error handling
- MongoDB integration with Mongoose
- RESTful API design 