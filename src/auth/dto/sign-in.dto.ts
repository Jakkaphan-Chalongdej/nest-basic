import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  username: string;

  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  password: string;
}
