import { Router } from 'express'; // Import Router from express
import { loginController } from '../controllers/auth.controller'; // Import login controller

// Creating a new instance of the router
const router = Router();

// Define the login route
// This route handles POST requests to /auth/login
router.post('/login', loginController);

// Export the router to be used in the main application
export default router;