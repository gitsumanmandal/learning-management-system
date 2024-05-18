import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto, req: any) {
    try {
      let course = new CourseDto();
      course = JSON.parse(JSON.stringify(createCourseDto));
      course.totalLessons = course.lessons.length;
      course.status = 'PENDING';
      course.teacher = req.user.name;
      course.metaData = {
        createdBy: req.user.role,
        createdAt: new Date(),
        lastUpdatedBy: req.user.role,
        lastUpdatedAt: new Date(),
      };
      course.enrollement = [];
      course.lessons.forEach((lesson) => {
        lesson.id = new ObjectId().toString();
        lesson.topics.forEach((topic) => {
          topic.id = new ObjectId().toString();
        });
      });
      const result = await this.coursesRepository.save(course);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      const res = await this.coursesRepository.find();
      return res;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: ObjectId) {
    try {
      const res = await this.coursesRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  async update(id: ObjectId, updateCourseDto: UpdateCourseDto) {
    try {
      const result = await this.coursesRepository.update(
        { _id: new ObjectId(id) },
        updateCourseDto,
      );
      return result;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: ObjectId) {
    try {
      const res = await this.coursesRepository.delete({
        _id: new ObjectId(id),
      });
      return res;
    } catch (err) {
      throw err;
    }
  }

  async enroll(id: ObjectId, req: any) {
    try {
      const course = await this.coursesRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
      const updateCourseDto = new UpdateCourseDto();
      updateCourseDto.enrollement = [...course.enrollement, req.user.userName];
      await this.coursesRepository.update(
        { _id: new ObjectId(id) },
        updateCourseDto,
      );
      return { message: 'Successfully enrolled' };
    } catch (err) {
      throw err;
    }
  }
}
