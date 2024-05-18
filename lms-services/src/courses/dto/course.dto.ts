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

export class CourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  teacher: string;

  @IsNotEmpty()
  @IsEnum(['PENDING', 'APPROVED', 'REJECTED', 'DEPRECATED'])
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DEPRECATED';

  @IsNotEmpty()
  @IsNumber()
  totalLessons: number;

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
  @IsOptional()
  @IsAlphanumeric()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TopicDto)
  topics: TopicDto[];
}

export class TopicDto {
  @IsOptional()
  @IsAlphanumeric()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
