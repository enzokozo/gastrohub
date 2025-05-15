import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

// Define the structure of the JWT payload
interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Authentication middleware to verify JWT tokens
export const authMiddleware = (req: Request, res: Response, next: NextFunction) : void => {
    const authHeader = req.headers.authorization;

    // Check if Authrotization header is present
    if (!authHeader) {
        res.status(401).json({message: 'Token is missing'});
        return;
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    
    try {
        // Verify and decode the token using the secret key
        const dedcoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;

        // Attach decoded user data to the request object
        req.user = dedcoded;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // If the verification fails, send a 401 unauthorized error
        console.error("JWT verification failed:", error);
        res.status(401).json({message: 'Invalid token'});
        return;
    }
};