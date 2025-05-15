import { Router } from "express"; // Importing Router from Express to define the routes
import {
    getAllKitchens, // Function to fetch all kitchens
    getKitchenByID, // Function to fetch a kitchen by its ID
    createKitchen, // Function to create a new kitchen
    updateKitchen, //Function to update an existing kitchen
    deleteKitchen, //Function to delete a kitchen
} from "../controllers/kitchen.controller";

// Creating a new instance of the router
const router = Router();

// Route to fetch all kitchens (GET request)
router.get("/", getAllKitchens);  // Calls the controller's 'getAllKitchens' function

// Route to fetch a kitchen by its unique ID (GET request)
router.get("/:id", getKitchenByID) // Calls the controller's 'getKitchenByID' function

// Route to create a new kitchen (POST request)
router.post("/", createKitchen); // Calls the repository's 'createKitchen' function

// Route to update a kitchen by its ID (PUT request)
router.put("/:id", updateKitchen) // Calls the controller's 'updateKitchen' function

// Route to delete a kitchen by its ID (DELETE request)
router.delete("/:id", deleteKitchen);  // Calls the controller's 'deleteKitchen' function

// Exporting the router to be used in the main application
export default router;