import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueryString } from '../../../shared/dto/paginationQueryString.dto';

export class UserQueryString extends PaginationQueryString {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform((value) => Number(value.value))
  role?: number;
}
