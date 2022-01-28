import { Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repository/user.repository';
import { compareSync } from 'bcrypt';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          role: 'user.role',
        },
      },
      where: { isDelete: false, username: username },
    });
    if (user && (await compareSync(password, user.password))) {
      return user;
    }
    return null;
  }
}
