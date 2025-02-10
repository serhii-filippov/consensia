# Customer Loyalty Program Service

This service manages customer loyalty points for an e-commerce platform. It provides endpoints to handle events, retrieve loyalty points, and consume points.

## Features
- **Authentication**: JWT-based authentication for secure endpoints.
- **Validation**: Request validation using `joi`.
- **Testing**: Comprehensive unit and integration tests using Jest.
- **MongoDB**: Data storage with MongoDB.

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `docker-compose up --build && docker-compose up -d` to start MongoDB container.
4. Run `npm run dev` to start the server in dev mode.

## Endpoints
- **POST /webhook**: Handle loyalty program events. **PUBLIC**
- **GET /:customerId/points**: Get loyalty points for a customer. **AUTH** required
- **POST /:customerId/consume**: Consume loyalty points for a customer. **AUTH** required

## Testing
Run tests with:
```bash
npm test