import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({ example: 'admin', required: false })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ example: 'admin', required: false })
  @IsString()
  @IsOptional()
  currentPassword: string;
}
