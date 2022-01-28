import { BadRequestException, Injectable } from '@nestjs/common';
import { CrudService } from '../../base/crud.service';
import { RoleEntity } from '../../database/entities/role.entity';
import { Connection, Like } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from '../../database/repository/role.repository';

@Injectable()
export class RoleService extends CrudService<RoleEntity> {
  constructor(
    protected readonly repository: RoleRepository,
    private readonly connection: Connection,
  ) {
    super();
  }
  async createRole(data: CreateRoleDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { name } = data;
      const roleName = await this.repository.find({
        where: { isDelete: false, name: Like(name) },
      });
      if (roleName.length > 0) {
        throw new BadRequestException('Role name is already!');
      }
      const _role = new RoleEntity();
      _role.name = name;
      await queryRunner.manager.save(_role);

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return _role;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async updateRole(id: number, data: UpdateRoleDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { name } = data;
      const role = await this.repository.findOne({
        where: { id: id, isDelete: false },
      });
      role.name = name;
      await queryRunner.manager.save(role);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return role;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
}
