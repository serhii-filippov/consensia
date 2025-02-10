# Customer Loyalty Program Service

This service manages customer loyalty points for an e-commerce platform. It provides endpoints to handle events, retrieve loyalty points, and consume points.

## Features
- **Authentication**: JWT-based authentication for secure endpoints.
- **Validation**: Request validation using `joi`.
- **Testing**: Comprehensive unit and integration tests using Jest.
- **MongoDB**: Data storage with MongoDB.

## Setup
1. Clone the repository.
2. Run `docker-compose up -d` to start MongoDB.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the server.

## Endpoints
- **POST /webhook**: Handle loyalty program events.
- **GET /:customerId/points**: Get loyalty points for a customer.
- **POST /:customerId/consume**: Consume loyalty points for a customer.

## Testing
Run tests with:
```bash
npm test