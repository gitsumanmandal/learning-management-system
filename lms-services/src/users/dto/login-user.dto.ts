import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'suman',
    required: true
 })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'Hello@123',
    required: true
 })
  @IsNotEmpty()
  @IsString()
  password: string;
}
