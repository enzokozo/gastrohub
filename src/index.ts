import express from "express";  // Importing the Express framework for routing and handling HTTP requests
import swaggerUi from 'swagger-ui-express'; // Importing Swagger UI for API documentation
import swaggerJsdoc from 'swagger-jsdoc'; // Importing Swagger JSDoc for generating API documentation
import restaurantRoutes from "./routes/restaurant.route";  // Importing the restaurant routes from the "restaurant.routes" file
import kitchenRoutes from "./routes/kitchen.route";  // Importing the kitchen routes from the "kitchen.routes" file
import authRoutes from "./routes/auth.route";  // Importing the authentication routes from the "auth.routes" file
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();  // Initializing the Express app

// Middlewares
app.use(express.json());  // Enabling middleware to parse JSON bodies in requests

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GastroHub API',
      version: '1.0.0',
      description: 'API documentation for the GastroHub application',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/schemas/*.ts'],  // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);  // Generating the Swagger specification

// Routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Setting up the Swagger UI at the /docs endpoint
app.use("/restaurants", authMiddleware, restaurantRoutes);  // Defining the base path for restaurant routes
app.use("/kitchens", kitchenRoutes);  // Defining the base path for kitchen routes
app.use("/auth", authRoutes);  // Defining the base path for authentication routes

// Test Route
app.get("/", (req, res) => {  // Simple test route to check if the API is running
  res.send("API is running!");  // Sending a response to confirm the API is up and running
});

// Setting the port to either the value from the environment or default to 3000
const PORT = process.env.PORT || 3000;  
// Start the server
app.listen(PORT, () => {  // Starting the server and listening on the specified port
  console.log(`🚀 Server running at http://localhost:${PORT}`);  // Logging the message to the console once the server starts
});
