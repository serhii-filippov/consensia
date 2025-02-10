import jwt from 'jsonwebtoken';
import {
    Response,
    NextFunction,
} from 'express';
import { AuthenticatedRequest } from '../models/event';
import { config } from '../config';

const SECRET_KEY = config.jwt.secret;

/**
 * Generate a JWT token for a customer.
 * @param customerId - The ID of the customer.
 * @returns The generated JWT token.
 */
export const generateToken = (customerId: string): string => {
  // @ts-ignore
  return jwt.sign(
    { customerId },
    SECRET_KEY,
    { expiresIn:`${config.jwt.expiresIn || 1}h`});
};

/**
 * Middleware to authenticate requests using JWT.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });

    return
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { customerId: string };
    req.customerId = decoded.customerId;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token provided.' });
  }
};