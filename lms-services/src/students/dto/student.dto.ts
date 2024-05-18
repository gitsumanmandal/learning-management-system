import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class StudentDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  domain: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CompletionGraphtDto)
  completionGraph: CompletionGraphtDto[];

  @IsNotEmpty()
  @Type(() => BaseDto)
  metaData: BaseDto;
}

export class CompletionGraphtDto {
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  lessonId: string;
}
