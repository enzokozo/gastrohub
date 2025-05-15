import express from "express";  // Importing the Express framework for routing and handling HTTP requests
import swaggerUi from 'swagger-ui-express'; // Importing Swagger UI for API documentation
import swaggerJsdoc from 'swagger-jsdoc'; // Importing Swagger JSDoc for generating API documentation
import restaurantRoutes from "./routes/restaurant.route";  // Importing the restaurant routes from the "restaurant.routes" file
import kitchenRoutes from "./routes/kitchen.route";  // Importing the kitchen routes from the "kitchen.routes" file

const app = express();  // Initializing the Express app
const PORT = process.env.PORT || 3000;  // Setting the port to either the value from the environment or default to 3000

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
  },
  apis: ['./src/schemas/*.ts'],  // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);  // Generating the Swagger specification
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Setting up the Swagger UI at the /docs endpoint

// Routes
app.use("/restaurants", restaurantRoutes);  // Defining the base path for restaurant routes
app.use("/kitchens", kitchenRoutes);  // Defining the base path for kitchen routes

// Test Route
app.get("/", (req, res) => {  // Simple test route to check if the API is running
  res.send("API is running!");  // Sending a response to confirm the API is up and running
});

// Start the server
app.listen(PORT, () => {  // Starting the server and listening on the specified port
  console.log(`🚀 Server running at http://localhost:${PORT}`);  // Logging the message to the console once the server starts
});
