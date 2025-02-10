import {
  generateToken,
  authenticate,
} from '../utils/auth';
import {
  Request,
  Response,
  NextFunction,
} from 'express';

describe('Authentication', () => {
  test('generateToken creates a valid JWT', () => {
    const token = generateToken('123');
    expect(token).toBeDefined();
  });

  test('authenticate middleware allows access with valid token', () => {
    const req = { header: jest.fn().mockReturnValue(`Bearer ${generateToken('123')}`) } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    authenticate(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('authenticate middleware denies access with invalid token', () => {
    const req = { header: jest.fn().mockReturnValue('Bearer invalid-token') } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    authenticate(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});