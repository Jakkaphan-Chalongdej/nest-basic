import { NotFoundException } from '@nestjs/common';
import { ExtendedEntity } from '../database/common/extended-entity';
import {
  BaseEntity,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

export class CrudService<T extends ExtendedEntity> {
  protected repository: Repository<T>;

  constructor(repository?: Repository<T>) {
    if (repository) {
      this.repository = repository;
    }
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    const entities = await this.repository.find(options);
    return entities;
  }

  async findAndCount(options: FindManyOptions<T>): Promise<[T[], number]> {
    const [entities, count] = await this.repository.findAndCount(options);
    return [entities, count];
  }

  public async findOneById(id: number): Promise<T> {
    const entity = await this.repository.findOne(id);
    return entity;
  }

  public async findOne(options?: FindOneOptions<T>): Promise<T> {
    const entity = await this.repository.findOne(options);
    return entity;
  }

  public async create(data: DeepPartial<T>): Promise<T> {
    const entity: T = this.repository.create(data);
    return entity.save();
  }

  public async saveAll(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(data);
  }

  public async update(data: DeepPartial<T> | T): Promise<T> {
    const id = Number(data.id || null);
    return this.patch(id, data);
  }

  public async patch(id: number, data: DeepPartial<T> | T): Promise<T> {
    let entity: T = null;
    const now = new Date().getTime();
    if (data instanceof BaseEntity) {
      entity = data;
    } else {
      entity = await this.findOneById(id);
      if (!entity) throw new NotFoundException();
      if (data.id) {
        delete data.id;
      }
      this.repository.merge(entity, data);
    }
    let createdAt = entity.createdAt;
    if (!createdAt) {
      createdAt = now;
    }
    entity.createdAt = createdAt;
    entity.updatedAt = now;
    return entity.save();
  }

  public async delete(id: number): Promise<T> {
    const entity: T = await this.findOneById(id);
    if (!entity) throw new NotFoundException();
    await this.repository.delete(id);
    return entity;
  }

  public async softDelete({ id }: DeepPartial<T>): Promise<T> {
    const now = new Date().getTime();
    const entity = await this.findOne({
      where: {
        id: id,
      },
    });
    if (!entity) throw new NotFoundException();
    entity.isDelete = true;
    entity.updatedAt = now;
    entity.deletedAt = now;
    return entity.save();
  }

  public merge(entity: T, data: DeepPartial<T>): T {
    return this.repository.merge(entity, data);
  }
}
