import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validateBody(schema: ZodSchema<any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try { req.body = schema.parse(req.body); next(); } catch (e:any) { e.status=422; next(e); }
  };
}

export function validateQuery(schema: ZodSchema<any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try { req.query = schema.parse(req.query); next(); } catch (e:any) { e.status=422; next(e); }
  };
}
