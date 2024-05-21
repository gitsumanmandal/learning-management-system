import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CompletionGraphtDto, StudentDto } from './dto/student.dto';
import { MarkLearnedDto } from './dto/mark-learned.dto';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) { }

  async create(createStudentDto: CreateStudentDto, userName?: string) {
    try {
      let student = new StudentDto();
      student = JSON.parse(JSON.stringify(createStudentDto));
      student.metaData = {
        createdBy: userName,
        createdAt: new Date(),
        lastUpdatedBy: userName,
        lastUpdatedAt: new Date(),
      };
      const result = await this.studentsRepository.save(student);
      return { message: 'Created successfully' };
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      const res = await this.studentsRepository.find();
      return { data: res, message: 'All listed successfully' };
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: ObjectId) {
    try {
      const res = await this.studentsRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
      return { data: res, message: 'One listed successfully' };
    } catch (err) {
      throw err;
    }
  }

  async update(id: ObjectId, updateStudentDto: UpdateStudentDto) {
    try {
      updateStudentDto.metaData = {
        createdBy: 'user.userName',
        createdAt: new Date(),
        lastUpdatedBy: 'user.userName',
        lastUpdatedAt: new Date(),
      };
      const result = await this.studentsRepository.update(
        { _id: new ObjectId(id) },
        updateStudentDto,
      );
      return { message: 'Updated successfully' };
    } catch (err) {
      throw err;
    }
  }

  async remove(id: ObjectId) {
    try {
      const res = await this.studentsRepository.delete({
        _id: new ObjectId(id),
      });
      return { message: 'Removed successfully' };
    } catch (err) {
      throw err;
    }
  }

  async markLearned(markLearnedDto: MarkLearnedDto, req: any) {
    try {
      const me = await this.studentsRepository.findOne({
        where: { userName: req.user.userName },
      });
      const completionGraphtDto = new CompletionGraphtDto();
      completionGraphtDto.courseId = markLearnedDto.courseId;
      completionGraphtDto.lessonId = markLearnedDto.lessonId;
      me.completionGraph.forEach((item) => {
        if (
          item.courseId === markLearnedDto.courseId &&
          item.lessonId === markLearnedDto.lessonId
        )
          throw 'Already Learned';
      });
      me.completionGraph = [...me.completionGraph, completionGraphtDto];
      const updateStudentDto = new UpdateStudentDto();
      updateStudentDto.completionGraph = me.completionGraph;
      updateStudentDto.metaData = {
        createdBy: req.user.userName,
        createdAt: new Date(),
        lastUpdatedBy: req.user.userName,
        lastUpdatedAt: new Date(),
      };
      await this.studentsRepository.update(
        { userName: req.user.userName },
        updateStudentDto,
      );
      return { message: 'Learned' };
    } catch (err) {
      throw err;
    }
  }

  async progressMeter(id: ObjectId, req: any) {
    try {
      const me = await this.studentsRepository.findOne({
        where: { userName: req.user.userName },
      });
      const totalLessons = (
        await this.coursesRepository.findOne({
          where: { _id: new ObjectId(id) },
        })
      ).totalLessons;
      const learned = me.completionGraph.filter(
        (item) => item.courseId === id.toString(),
      );
      return {
        data: {
          learned: learned,
          progress: (learned.length / totalLessons) * 100,
        },
        message: 'Listed progress'
      };
    } catch (err) {
      throw err;
    }
  }
}
