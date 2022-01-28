import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DB_TABLE, ENUMTypeColumnEntity } from '../common/enum/database.enum';
import { SERIALIZE_GROUP } from '../common/enum/serialization-group.enum';
import { ExtendedEntity } from '../common/extended-entity';
import { RoleEntity } from './role.entity';

@Entity(DB_TABLE.USER)
export class UserEntity extends ExtendedEntity {
  @PrimaryGeneratedColumn({ type: ENUMTypeColumnEntity.TYPE_ID })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  id: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  @Expose({
    groups: [
      SERIALIZE_GROUP.GROUP_ALL_USER,
      SERIALIZE_GROUP.GROUP_USER,
      SERIALIZE_GROUP.GROUP_USER_PROFILE,
    ],
  })
  fullName: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  @Expose({
    groups: [
      SERIALIZE_GROUP.GROUP_ALL_USER,
      SERIALIZE_GROUP.GROUP_USER,
      SERIALIZE_GROUP.GROUP_USER_PROFILE,
    ],
  })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({
    groups: [
      SERIALIZE_GROUP.GROUP_ALL_USER,
      SERIALIZE_GROUP.GROUP_USER,
      SERIALIZE_GROUP.GROUP_USER_PROFILE,
    ],
  })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Expose({ groups: [SERIALIZE_GROUP.GROUP_USER] })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  @Expose({ groups: [SERIALIZE_GROUP.GROUP_USER] })
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.id, { nullable: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER, SERIALIZE_GROUP.GROUP_ALL_USER],
  })
  role: RoleEntity;
}
