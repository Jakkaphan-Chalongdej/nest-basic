import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsIn,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationQueryString {
  @ApiProperty({ example: 1, default: 1 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ example: 10, default: 10 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({
    example: OrderBy.DESC,
    default: OrderBy.DESC,
    enum: [OrderBy.DESC, OrderBy.ASC],
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value.toUpperCase())
  @IsIn([OrderBy.ASC, OrderBy.DESC])
  orderby?: OrderBy = OrderBy.ASC;
}
export class SearchQueryStringDto extends PaginationQueryString {
  @ApiProperty({ example: 'Account Executive', required: false, default: '' })
  @IsString()
  @IsOptional()
  search?: string;
}
