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
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ObjectId } from 'mongodb';
import { AuthGuard } from 'src/auth/auth.guard';
import { MarkLearnedDto } from './dto/mark-learned.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Students')
@UseGuards(AuthGuard, RolesGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Roles(['NONE'])
  @Post()
  @ApiOperation({ description: 'NOT TO USE EXTERNALLY. This end point is called internally when a user of STUDENT type is created' })
  @ApiExcludeEndpoint()
  create() {
    return {};
  }

  @ApiBearerAuth('Bearer')
  @Roles(['ADMIN'])
  @Get()
  @ApiOperation({ description: 'Only ADMIN can view all students. So to proceed, use a ADMIN login and it\'s token'})
  findAll() {
    return this.studentsService.findAll();
  }

  @ApiBearerAuth('Bearer')
  @Roles(['ADMIN'])
  @Get(':id')
  @ApiOperation({ description: 'Only ADMIN can view one student. So to proceed, use a ADMIN login and it\'s token'})
  findOne(@Param('id') id: ObjectId) {
    return this.studentsService.findOne(id);
  }

  @ApiBearerAuth('Bearer')
  @Roles(['STUDENT'])
  @Patch('learned')
  @ApiOperation({ description: 'Only STUDENT can mark a lesson learned. So to proceed, use a STUDENT login and it\'s token'})
  markLearned(
    @Body(ValidationPipe) markLearnedDto: MarkLearnedDto,
    @Request() req: any,
  ) {
    return this.studentsService.markLearned(markLearnedDto, req);
  }

  @ApiBearerAuth('Bearer')
  @Roles(['STUDENT'])
  @Get('progressMeter/:id')
  @ApiOperation({ description: 'Only STUDENT can see the progress of his/her learning of a course. So to proceed, use a STUDENT login and it\'s token'})
  progressMeter(@Param('id') id: ObjectId, @Request() req: any) {
    return this.studentsService.progressMeter(id, req);
  }

  @Roles(['NONE'])
  @Patch(':id')
  @ApiOperation({ description: 'NOT TO USE EXTERNALLY. This end point is called internally when a user of STUDENT type is updated'})
  @ApiExcludeEndpoint()
  update() {
    return {};
  }

  @Roles(['NONE'])
  @Delete(':id')
  @ApiOperation({ description: 'NOT TO USE EXTERNALLY. This end point is called internally when a user of STUDENT type is removed'})
  @ApiExcludeEndpoint()
  remove() {
    return {};
  }
}
