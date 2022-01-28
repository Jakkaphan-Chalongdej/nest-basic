import { Expose } from 'class-transformer';
import { BaseEntity, BeforeInsert, Column } from 'typeorm';
import { ENUMTypeColumnEntity } from './enum/database.enum';
import { SERIALIZE_GROUP } from './enum/serialization-group.enum';

export class ExtendedEntity extends BaseEntity {
  public id?: number;

  @Column({ type: 'bool', default: false, name: 'is_delete' })
  @Expose({
    groups: [],
  })
  public isDelete: boolean;

  @Column({ type: ENUMTypeColumnEntity.TYPE_DATE, name: 'created_at' })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_BASE, SERIALIZE_GROUP.GROUP_ALL_BASE],
  })
  public createdAt: number;

  @Column({
    type: ENUMTypeColumnEntity.TYPE_DATE,
    name: 'updated_at',
    nullable: true,
  })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_BASE, SERIALIZE_GROUP.GROUP_ALL_BASE],
  })
  public updatedAt: number;

  @Column({
    type: ENUMTypeColumnEntity.TYPE_DATE,
    name: 'deleted_at',
    nullable: true,
  })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_BASE, SERIALIZE_GROUP.GROUP_ALL_BASE],
  })
  deletedAt: number;

  @BeforeInsert()
  newDate() {
    const _now = new Date().getTime();
    this.createdAt = _now;
    this.updatedAt = _now;
  }
}
