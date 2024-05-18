import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findBy(loginUserDto);
    const isValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isValid) throw new UnauthorizedException();
    const payload = {
      _id: user._id,
      role: user.role,
      name: user.name,
      userName: user.userName,
      emailId: user.emailId,
      contactNo: user.contactNo,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
