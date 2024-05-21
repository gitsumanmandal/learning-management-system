import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ description: 'This will log a custemr in' })
  @ApiResponse({ description: 'Copy the access_token and Authroize the app using this token for rest of the endpoint testing (wherever auth required is mentioned with a lock symbol)' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  logIn(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    return this.authService.logIn(loginUserDto);
  }
}
