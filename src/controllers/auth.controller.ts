import { Request, Response } from "express"; // Import types for request handlers
import jwt from "jsonwebtoken"; // Import JWT library
import argon2 from "argon2";  // Import Argon2 for password hashing
import * as authRepository from "../repositories/auth.repository"; // Import kitchen repository

// Use secret key from environment variable or default
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Handles user authentication (POST /auth/login)
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body; // Extract email and password from request body

  // Validate required fields
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  try {
    // Retrieve user by email
    const user = await authRepository.getUserByEmail(email);

    // Check if user exists
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    // Verify password using Argon2
    const isPasswordValid = await argon2.verify(user.password, password);

    // Check if password is valid
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password." }); // Return 401 unauthorized access 
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.userRole },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Respond with token on successful login
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." }); // Handle unexpected errors
  }
};