import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './shared/http-exception';
import { TransformInterceptor } from './shared/http-interception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix(config.get<string>('app.prefixApi'));
  const options = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .addBearerAuth({ in: 'headers', type: 'http' })
    .build();
  // app.use(
  //   '/api/docs',
  //   basicMiddleware(
  //     config.get('app.basicUsername'),
  //     config.get('app.basicPassword'),
  //   ),
  // );
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  app.use(helmet());
  // app.useStaticAssets(join(__dirname, '..', '..', 'bucket'));
  app.use(morgan('tiny'));
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: config.get<boolean>('app.isProduction'),
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.set('trust proxy', 1);
  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      return callback(null, true);
    },
    methods: 'GET,PUT,POST,DELETE',
  });

  await app.listen(config.get<number>('app.port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
