import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ValidationError,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorUtil } from '../utils/error.util';
import { ValidationException } from './exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errors = exception.getResponse() as ValidationError[];

    response.status(status).json({ error: ErrorUtil.validationErrors(errors) });
  }
}
