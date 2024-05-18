import { OmitType, PickType } from '@nestjs/mapped-types';
import { CourseDto, LessonDto, TopicDto } from './course.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto extends PickType(CourseDto, [
  'name',
  'description',
] as const) {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateLessonDto)
  lessons: CreateLessonDto[];
}

export class CreateLessonDto extends PickType(LessonDto, [
  'name',
  'description',
] as const) {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTopicDto)
  topics: CreateTopicDto[];
}

export class CreateTopicDto extends OmitType(TopicDto, ['id'] as const) {}
