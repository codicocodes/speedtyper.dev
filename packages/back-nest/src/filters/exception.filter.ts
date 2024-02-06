import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

interface ErrorResponse {
  message: string;
  status: number;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let errorResponse: ErrorResponse;
    const message = exception.message;

    if (exception instanceof HttpException) {
      errorResponse = { status: exception.getStatus(), message };
    } else if (exception instanceof QueryFailedError) {
      errorResponse = {
        message: 'Internal server error',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    } else {
      errorResponse = {
        message: 'Internal server error',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }

    if (errorResponse.status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.log(exception);
    }

    response.status(errorResponse.status).json({
      statusCode: errorResponse.status,
      message: errorResponse.message,
    });
  }
}
