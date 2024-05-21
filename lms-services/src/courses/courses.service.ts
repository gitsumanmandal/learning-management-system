import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      return { message: 'Created successfully'};
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      const res = await this.coursesRepository.find();
      const result = res.map(ele => {
        return {
          _id: ele._id,
          name: ele.name,
          teacher: ele.teacher,
          totalLessons: ele.totalLessons,
          enrollement: ele.enrollement
        }
      })
      return { data: result, message: 'All listed successfully'};
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: ObjectId, req: any) {
    try {
      const res = await this.coursesRepository.findOne({
        where: { _id: new ObjectId(id) },
      });
      if(req.user.role === 'STUDENT') {
        if(!res.enrollement.includes(req.user.userName)) throw UnauthorizedException
      }
      if(req.user.role === 'TEACHER') {
        if(!res.teacher === req.user.name) throw UnauthorizedException
      }
      return { data: res, message: 'One listed successfully'};
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
      return { message: 'Updated successfully'};
    } catch (err) {
      throw err;
    }
  }

  async remove(id: ObjectId) {
    try {
      const res = await this.coursesRepository.delete({
        _id: new ObjectId(id),
      });
      return { message: 'Remved successfully'};
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
      return { message: 'Enrolled successfully' };
    } catch (err) {
      throw err;
    }
  }
}
