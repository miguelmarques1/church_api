import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export function validation(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors.flatMap(error => 
        Object.values(error.constraints || {})
      );
      res.status(400).json({ error: true, data: null, message: errorMessages.join(', ') });
      return;
    }

    req.body = dto;
    next();
  };
}