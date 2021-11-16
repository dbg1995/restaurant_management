import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { ErrorUtil } from '../utils/error.util';

@Catch()
export class InternalServerExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    res.status(status).json({ error: ErrorUtil.internalServerError() });
  }
}
