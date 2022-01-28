import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  @Transform(({ value }) => {
    return String(value).trim();
  })
  name: string;
}
