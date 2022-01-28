import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('exception :', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = 400;
    let message;

    if (!exception['response']) {
      message = exception.message;
    } else {
      message = exception['response']['message'];
    }
    try {
      status = exception.getStatus();
    } catch {}
    response.status(status).json({
      code: status,
      message: message,
      status: 'fail',
    });
  }
}
