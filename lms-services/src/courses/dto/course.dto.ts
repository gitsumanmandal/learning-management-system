import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseDto } from 'src/base/base.dto';
import { ApiProperty, ApiTags, getSchemaPath } from '@nestjs/swagger';
export class CourseDto {
  @ApiProperty({
    example: 'Deno JS Beginner',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This is core concepts tutorial on Node JS for advanced learners only',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Albert Einstein',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  teacher: string;

  @ApiProperty({
    example: 'PENDING',
    required: true
  })
  @IsNotEmpty()
  @IsEnum(['PENDING', 'APPROVED', 'REJECTED', 'DEPRECATED'])
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DEPRECATED';

  @ApiProperty({
    example: 10,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  totalLessons: number;

  @ApiProperty({
    example: [],
    required: true
  })
  @IsNotEmpty()
  @IsArray()
  enrollement: string[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LessonDto)
  lessons: LessonDto[];

  @IsNotEmpty()
  @Type(() => BaseDto)
  metaData: BaseDto;
}

export class LessonDto {

  @ApiProperty({
    example: '664af43b1b23354f610c36a2',
    required: true
  })
  @IsOptional()
  @IsAlphanumeric()
  id: string;

  @ApiProperty({
    example: 'lesson 1',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This is description of lesson 1',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: [],
    required: true
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TopicDto)
  topics: TopicDto[];
}

export class TopicDto {
  @ApiProperty({
    example: '664af43b1b23354f610c36a3',
    required: true
  })
  @IsOptional()
  @IsAlphanumeric()
  id: string;

  @ApiProperty({
    example: 'topic 1',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This is topic 1 desc',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'This is topic 1 content',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
