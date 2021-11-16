import { ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { ErrorDTO } from '../dtos/error.dto';
import {
  ERROR_FORBIDDEN,
  ERROR_INTERNAL_SERVER,
  ERROR_PAGE_NOT_FOUND,
  ERROR_UNAUTHORIZED,
  ERROR_VALIDATION,
  ERROR_VALIDATION_CODES,
} from '../constants/error.constant';

export class ErrorUtil {
  static unauthorized(): ErrorDTO {
    return plainToClass(ErrorDTO, ERROR_UNAUTHORIZED);
  }

  static forbidden(): ErrorDTO {
    return plainToClass(ErrorDTO, ERROR_FORBIDDEN);
  }

  static internalServerError() {
    return plainToClass(ErrorDTO, ERROR_INTERNAL_SERVER);
  }

  static pageNotFoundError() {
    return plainToClass(ErrorDTO, ERROR_PAGE_NOT_FOUND);
  }

  static validationErrors(errors: ValidationError[]): ErrorDTO {
    const validationErrors: ErrorDTO[] = [];

    for (const error of errors) {
      const property = error.property;
      for (const constraint of Object.keys(error.constraints)) {
        const errorType = constraint
          .replace(/[A-Z]/g, (letter) => `_${letter}`)
          .toUpperCase();
        const code = ERROR_VALIDATION_CODES[errorType];
        const message = error.constraints[constraint];

        validationErrors.push(
          plainToClass(ErrorDTO, { property, code, message }),
        );
      }
    }

    return plainToClass(ErrorDTO, {
      ...ERROR_VALIDATION,
      errors: validationErrors,
    });
  }
}
