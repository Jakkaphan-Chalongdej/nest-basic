import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '../../database/repository/user.repository';
import { RoleRepository } from '../../database/repository/role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
