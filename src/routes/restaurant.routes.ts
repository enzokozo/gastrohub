import { Router } from "express";  // Importing Router from Express to define the routes
import {
  getAllRestaurants,    // Function to fetch all restaurants
  getRestaurantByID,    // Function to fetch a restaurant by its ID
  createRestaurant,     // Function to create a new restaurant
  updateRestaurant,     // Function to update an existing restaurant
  deleteRestaurant,     // Function to delete a restaurant
} from "../controllers/restaurant.controller";  // Importing controller functions

// Creating a new instance of the router
const router = Router();

// Route to fetch all restaurants (GET request)
router.get("/", getAllRestaurants);  // Calls the controller's 'getAllRestaurants' function

// Route to fetch a restaurant by its unique ID (GET request)
router.get("/:id", getRestaurantByID);  // Calls the controller's 'getRestaurantByID' function

// Route to create a new restaurant (POST request)
router.post("/", createRestaurant);  // Calls the controller's 'createRestaurant' function

// Route to update a restaurant by its ID (PUT request)
router.put("/:id", updateRestaurant);  // Calls the controller's 'updateRestaurant' function

// Route to delete a restaurant by its ID (DELETE request)
router.delete("/:id", deleteRestaurant);  // Calls the controller's 'deleteRestaurant' function

// Exporting the router to be used in the main application
export default router;
