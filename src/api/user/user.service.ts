import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CrudService } from '../../base/crud.service';
import { UserEntity } from '../../database/entities/user.entity';
import { UserRepository } from '../../database/repository/user.repository';
import {
  ENUMErrorMessage,
  ENUMErrorMessages,
} from '../../shared/enum/error-message.enum';
import { EnumDirectoryName } from '../../shared/enum/multer.enum';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Connection, QueryRunner } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleRepository } from '../../database/repository/role.repository';

@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(
    protected readonly repository: UserRepository,
    private readonly connection: Connection,
    private readonly roleRepository: RoleRepository,
  ) {
    super();
  }
  async createUser(data: CreateUserDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    const _alreadyAdmin = await this.repository.findOne({
      where: {
        isDelete: false,
        username: data.username.trim(),
      },
    });
    if (_alreadyAdmin) {
      throw new BadRequestException(ENUMErrorMessages.ALREADY_USER);
    }
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hashSync(data.password, salt);

    return await this.createTableUser(queryRunner, data);
  }

  async createTableUser(queryRunner: QueryRunner, data: CreateUserDto) {
    const role = await this.roleRepository.findOne({
      where: { id: data.role, isDelete: false },
    });
    if (!role) {
      throw new NotFoundException(ENUMErrorMessages.NOTFOUND_ROLE);
    }
    const user = new UserEntity();
    user.fullName = data.fullName;
    user.username = data.username;
    user.phone = data.phone;
    user.password = data.password;
    user.role = role;
    await queryRunner.manager.save(user);
  }

  async updateUser(user: UserEntity, data: UpdateUserDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    if (data.password) {
      if (!data.currentPassword) {
        throw new Error('require current password');
      }
      const comparePassword = await bcrypt.compareSync(
        data.currentPassword,
        user.password,
      );
      if (!comparePassword) {
        throw new Error(`current password not match`);
      }
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hashSync(data.password, salt);
    } else {
      data.password = user.password;
    }
    return await this.createTableUser(queryRunner, data);
  }
}
