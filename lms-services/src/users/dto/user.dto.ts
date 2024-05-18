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
  @IsNotEmpty()
  @IsEnum(['ADMIN', 'TEACHER', 'STUDENT'], {
    message: 'Valid role required',
  })
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  contactNo: string;

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
