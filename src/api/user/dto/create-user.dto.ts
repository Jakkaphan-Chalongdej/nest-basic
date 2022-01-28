import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'admin admin' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '0954587542' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'admin@email.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  role: number;
}
