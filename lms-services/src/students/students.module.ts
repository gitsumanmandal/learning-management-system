import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [TypeOrmModule, StudentsService],
})
export class StudentsModule {}
