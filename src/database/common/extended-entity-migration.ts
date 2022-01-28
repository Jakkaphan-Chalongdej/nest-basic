import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';
import {
  ENUMBaseEntity,
  ENUMCommonEntity,
  ENUMTypeColumnEntity,
} from './enum/database.enum';

export const baseEntityMigration: TableColumnOptions[] = [
  {
    name: ENUMBaseEntity.ID,
    type: ENUMTypeColumnEntity.TYPE_ID,
    isPrimary: true,
    isGenerated: true,
  },
];

export const commonEntityMigration: TableColumnOptions[] = [
  {
    name: ENUMCommonEntity.IS_DELETE,
    type: 'bool',
    default: false,
  },
  {
    name: ENUMCommonEntity.CREATED_AT,
    type: ENUMTypeColumnEntity.TYPE_DATE,
  },
  {
    name: ENUMCommonEntity.UPDATED_AT,
    type: ENUMTypeColumnEntity.TYPE_DATE,
    isNullable: true,
  },

  {
    name: ENUMCommonEntity.DELETED_AT,
    type: ENUMTypeColumnEntity.TYPE_DATE,
    isNullable: true,
  },
];
