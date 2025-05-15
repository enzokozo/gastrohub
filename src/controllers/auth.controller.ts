import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import * as authRepository from "../repositories/auth.repository";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// POST /auth/login
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  try {
    const user = await authRepository.getUserByEmail(email);

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password." });
      return;
    }

    const token = jwt.sign(
      { id: user.id, role: user.userRole },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};