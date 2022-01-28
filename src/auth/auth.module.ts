import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { UserRepository } from '../database/repository/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      privateKey: readFileSync(join(process.cwd(), 'rsa.private'), 'utf8'),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '12h',
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, AuthService, PassportModule],
})
export class AuthModule {}
