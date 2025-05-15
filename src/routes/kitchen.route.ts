import { Router } from "express"; // Importing Router from Express to define the routes
import {
    getAllKitchens, // Function to fetch all kitchens
} from "../controllers/kitchen.controller";

// Creating a new instance of the router
const router = Router();

// Route to fetch all kitchens (GET request)
router.get("/", getAllKitchens);  // Calls the controller's 'getAllKitchens' function


export default router;