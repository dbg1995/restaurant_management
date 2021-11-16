import { HttpStatus, HttpException, ValidationError } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(validationErrors: ValidationError[]) {
    super(validationErrors, HttpStatus.BAD_REQUEST);
  }
}
