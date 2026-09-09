import { Request, Response, NextFunction } from 'express';

const sanitizeString = (str: string): string => {
  if (str.startsWith('data:image/') || str.startsWith('data:application/')) {
    return str;
  }
  return str
    .trim()
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[<>]/g, ''); // Remove remaining angle brackets
};

const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  if (typeof obj === 'object' && obj !== null) {
    const sanitizedObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitizedObj[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitizedObj;
  }
  return obj;
};

export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  next();
};
