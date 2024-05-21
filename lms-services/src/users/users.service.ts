import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ObjectId } from 'mongodb';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import configuration from 'src/config/configuration';
import { StudentsService } from 'src/students/students.service';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private studentService: StudentsService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      let user = new UserDto();
      user = JSON.parse(JSON.stringify(createUserDto));
      const password = user.password;
      const hash = await bcrypt.hash(password, configuration().saltRounds);
      user.password = hash;
      user.metaData = {
        createdBy: user.userName,
        createdAt: new Date(),
        lastUpdatedBy: user.userName,
        lastUpdatedAt: new Date(),
      };
      const userAdded = await this.usersRepository.save(user);
      if (createUserDto.role === 'STUDENT') {
        const student = new CreateStudentDto();
        student.userName = user.userName;
        student.completionGraph = [];
        await this.studentService.create(student)
      }
      let jwtService = new JwtService({
        global: true,
        secret: configuration().jwtSecret,
        signOptions: { expiresIn: '1h' },
      });
      const payload = {
        _id: userAdded._id,
        role: user.role,
        name: user.name,
        userName: user.userName,
        emailId: user.emailId,
        contactNo: user.contactNo,
      };
      return {
        data: { access_token: await jwtService.signAsync(payload) },
        message: 'Created successfully'
      };
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      const res = await this.usersRepository.find();
      return { data: res, message: 'All listed successfully' };
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: ObjectId) {
    try {
      const res = await this.usersRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
      return { data: res, message: 'One listed successfully' };
    } catch (err) {
      throw err;
    }
  }

  async findBy(loginUserDto: LoginUserDto) {
    try {
      const res = await this.usersRepository.findOne({
        where: { userName: loginUserDto.userName },
      });
      return { data: res, message: 'One listed successfully' };
    } catch (err) {
      throw err;
    }
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.usersRepository.update(
        { _id: new ObjectId(id) },
        updateUserDto,
      );
      return { message: 'Updated successfully' };
    } catch (err) {
      throw err;
    }
  }

  async remove(id: ObjectId) {
    try {
      const res = await this.usersRepository.delete({
        _id: new ObjectId(id),
      });
      return { message: 'Removed successfully' };
    } catch (err) {
      throw err;
    }
  }

  async profile(req: any) {
    try {
      const profile = req.user;
      return { data: profile, message: 'listed successfully' };
    } catch (err) {
      throw err;
    }
  }
}
