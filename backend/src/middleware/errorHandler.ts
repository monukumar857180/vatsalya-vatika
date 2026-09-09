import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('🔥 Global Server Error:', err?.message || err);

  // Fix: explicit parentheses to avoid operator precedence bug
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected internal server error occurred.',
    // Only expose stack trace in development
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
