# Contact Manager Application

This is a Node.js application built with Express and MongoDB for managing contacts using Domain Driven Design Achitecture. It provides user authentication and CRUD operations for contacts .

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed Node.js (version 14.x or later)
* You have a MongoDB instance running (local or remote)
* You have npm installed

## Installing Contact Manager Application

To install the Contact Manager Application, follow these steps:

1. Clone the repository:

   ```
   https://github.com/saxzzy94/hux-assessment-backend.git
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Configuring the Application

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secure random string for JWT token generation.

## Running the Application

To run the Contact Manager Application, follow these steps:

1. Start the server:
   ```
   npm run start:dev
   ```
2. The server will start running on `http://localhost:5000` (or the port you specified in the .env file).

## Using the Contact Manager Application

The application exposes the following API endpoints:

* POST /api/signup - Register a new user
* POST /api/login - Login and receive a JWT token
* POST /api/contacts - Create a new contact (requires authentication)
* GET /api/contacts - Get all contacts for the authenticated user
* PUT /api/contacts/:id - Update a specific contact
* DELETE /api/contacts/:id - Delete a specific contact

To use these endpoints, you'll need to include the JWT token in the Authorization header of your requests (except for signup and login).

## Dependencies

This project uses the following main dependencies:

* express: Web application framework
* mongoose: MongoDB object modeling tool
* jsonwebtoken: JSON Web Token implementation
* bcryptjs: Library for hashing passwords
* cors: Middleware to enable CORS
* dotenv: Module to load environment variables from a .env file

You can find the complete list of dependencies in the `package.json` file.
