import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  result?: T[];
  status: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const res = {
          code: 200,
          status: 'success',
        };
        let result = null;
        if (data) {
          Array.isArray(data) && data.length > 0
            ? (result = { result: data })
            : (result = { result: [data] });
        } else {
          result = {};
        }
        return {
          ...res,
          ...result,
        };
      }),
    );
  }
}
