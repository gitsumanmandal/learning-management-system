import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Student } from 'src/students/entities/student.entity';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [StudentsModule, TypeOrmModule.forFeature([User, Student])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
