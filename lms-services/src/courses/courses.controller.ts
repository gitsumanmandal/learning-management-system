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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Courses')
@UseGuards(AuthGuard, RolesGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @ApiBearerAuth('Bearer')
  @Roles(['TEACHER'])
  @Post()
  @ApiBody({ type: CreateCourseDto })
  @ApiOperation({ description: 'Only TEACHER can add a course. So to proceed, use a TEACHER login and it\'s token' })
  create(
    @Body(ValidationPipe) createCourseDto: CreateCourseDto,
    @Request() req: any,
  ) {
    return this.coursesService.create(createCourseDto, req);
  }

  @ApiBearerAuth('Bearer')
  @Get()
  @ApiOperation({ description: 'Get all the courses meta data' })
  findAll() {
    return this.coursesService.findAll();
  }

  @ApiBearerAuth('Bearer')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @Get(':id')
  @ApiOperation({ description: 'Get the content of a single course' })
  findOne(@Param('id', ValidationPipe) id: ObjectId, @Request() req: any) {
    return this.coursesService.findOne(id, req);
  }

  @ApiBearerAuth('Bearer')
  @Roles(['ADMIN', 'TEACHER'])
  @ApiParam({ name: 'id', type: 'string', required: true })
  @Patch(':id')
  @ApiBody({type: UpdateCourseDto})
  @ApiOperation({ description: 'Get the content of a single course' })
  @ApiOperation({ description: 'Only ADMIN / TEACHER can update a course. So to proceed, use a ADMIN / TEACHER login and it\'s token' })
  update(
    @Param('id', ValidationPipe) id: ObjectId,
    @Body(ValidationPipe) updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @ApiBearerAuth('Bearer')
  @Roles(['ADMIN'])
  @ApiParam({ name: 'id', type: 'string', required: true })
  @Delete(':id')
  @ApiOperation({ description: 'Only ADMIN can remove a course. So to proceed, use a ADMIN login and it\'s token' })
  remove(@Param('id', ValidationPipe) id: ObjectId) {
    return this.coursesService.remove(id);
  }

  @ApiBearerAuth('Bearer')
  @Roles(['STUDENT'])
  @ApiParam({ name: 'id', type: 'string', required: true })
  @Patch('enroll/:id')
  @ApiOperation({ description: 'Only STUDENT can enroll to a course. So to proceed, use a STUDENT login and it\'s token' })
  enroll(@Param('id', ValidationPipe) id: ObjectId, @Request() req: any) {
    return this.coursesService.enroll(id, req);
  }
}
