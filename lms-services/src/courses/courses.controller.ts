import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ObjectId } from 'mongodb';
import { AuthGuard } from 'src/auth/auth.guard';
// import { Public } from 'src/base/public.decorator';

@UseGuards(AuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(
    @Body(ValidationPipe) createCourseDto: CreateCourseDto,
    @Request() req: any,
  ) {
    return this.coursesService.create(createCourseDto, req);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidationPipe) id: ObjectId) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ValidationPipe) id: ObjectId,
    @Body(ValidationPipe) updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidationPipe) id: ObjectId) {
    return this.coursesService.remove(id);
  }

  @Patch('enroll/:id')
  enroll(@Param('id', ValidationPipe) id: ObjectId, @Request() req: any) {
    return this.coursesService.enroll(id, req);
  }
}
