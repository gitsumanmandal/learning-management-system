import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class UserDto {
  @ApiProperty({
    example: 'STUDENT', required: true
  })
  @IsNotEmpty()
  @IsEnum(['ADMIN', 'TEACHER', 'STUDENT'], {
    message: 'Valid role required',
  })
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';

  @ApiProperty({
    example: 'Sachin Tendulker', required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'sachin', required: true
  })
  @IsNotEmpty()
  @IsAlphanumeric()
  userName: string;

  @ApiProperty({
    example: 'sachin@mail.com', required: true
  })
  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @ApiProperty({
    example: '9876543210', required: true
  })
  @IsNotEmpty()
  @IsPhoneNumber('IN')
  contactNo: string;

  @ApiProperty({
    example: 'Hello@123', required: true
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 4,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;

  @IsNotEmpty()
  @Type(() => BaseDto)
  metaData: BaseDto;
}
