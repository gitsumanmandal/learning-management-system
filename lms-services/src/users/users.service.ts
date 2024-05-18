import { Injectable } from '@nestjs/common';
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
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { Student } from 'src/students/entities/student.entity';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class UsersService {
  constructor(
    private studentsService: StudentsService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

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
      await this.usersRepository.save(user);
      if (createUserDto.role === 'STUDENT') {
        const student = new CreateStudentDto();
        student.userName = user.userName;
        student.domain = '';
        student.completionGraph = [];
        await this.studentsService.create(student, user.userName);
      }
      return { messgae: 'Created user' };
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      const res = await this.usersRepository.find();
      return res;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: ObjectId) {
    try {
      const res = await this.usersRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  async findBy(loginUserDto: LoginUserDto) {
    try {
      const res = await this.usersRepository.findOne({
        where: { userName: loginUserDto.userName },
      });
      return res;
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
      return result;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: ObjectId) {
    try {
      const res = await this.usersRepository.delete({
        _id: new ObjectId(id),
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  async profile(req: any) {
    try {
      const profile = req.user;
      // if (req.user.role === 'STUDENT') {
      //   profile = await this.studentsRepository.findOne({
      //     where: { userName: req.user.userName },
      //   });
      // } else {
      //   profile = await this.usersRepository.findOne({
      //     where: { userName: req.user.userName },
      //   });
      // }
      return profile;
    } catch (err) {
      throw err;
    }
  }
}
