import express from "express";  // Importing the Express framework for routing and handling HTTP requests
import cors from "cors";  // Importing the CORS middleware to handle Cross-Origin Resource Sharing
import restaurantRoutes from "./routes/restaurant.route";  // Importing the restaurant routes from the "restaurant.routes" file
import kitchenRoutes from "./routes/kitchen.route";  // Importing the kitchen routes from the "kitchen.routes" file

const app = express();  // Initializing the Express app
const PORT = process.env.PORT || 3000;  // Setting the port to either the value from the environment or default to 3000

// Middlewares
app.use(cors());  // Enabling CORS middleware to allow cross-origin requests
app.use(express.json());  // Enabling middleware to parse JSON bodies in requests

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
