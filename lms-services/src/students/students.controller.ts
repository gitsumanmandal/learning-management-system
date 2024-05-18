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

@UseGuards(AuthGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body(ValidationPipe) createStudentDto: CreateStudentDto) {
    const res = this.studentsService.create(createStudentDto);
    return res;
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.studentsService.findOne(id);
  }

  @Patch('learned')
  markLearned(
    @Body(ValidationPipe) markLearnedDto: MarkLearnedDto,
    @Request() req: any,
  ) {
    return this.studentsService.markLearned(markLearnedDto, req);
  }

  @Get('progressMeter/:id')
  progressMeter(@Param('id') id: ObjectId, @Request() req: any) {
    return this.studentsService.progressMeter(id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body(ValidationPipe) updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.studentsService.remove(id);
  }
}
