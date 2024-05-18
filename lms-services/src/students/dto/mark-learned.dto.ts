import { IsNotEmpty, IsString } from 'class-validator';

export class MarkLearnedDto {
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  lessonId: string;
}
