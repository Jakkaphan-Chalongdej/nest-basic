import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PaginationQueryString } from './paginationQueryString.dto';

export class QueryNameDto extends PaginationQueryString {
  @ApiProperty({ example: 'xxxx', required: false, default: '' })
  @IsString()
  @IsOptional()
  search?: string;
}
