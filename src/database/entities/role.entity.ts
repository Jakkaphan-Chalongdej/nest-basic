import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DB_TABLE, ENUMTypeColumnEntity } from '../common/enum/database.enum';
import { SERIALIZE_GROUP } from '../common/enum/serialization-group.enum';
import { ExtendedEntity } from '../common/extended-entity';
import { UserEntity } from './user.entity';

@Entity(DB_TABLE.ROLE)
export class RoleEntity extends ExtendedEntity {
  @PrimaryGeneratedColumn({ type: ENUMTypeColumnEntity.TYPE_ID })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_ROLE],
  })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_ALL_ROLE, SERIALIZE_GROUP.GROUP_ROLE],
  })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.id, { nullable: true })
  @Expose({ groups: [SERIALIZE_GROUP.GROUP_ALL_ROLE] })
  user: UserEntity;
}
