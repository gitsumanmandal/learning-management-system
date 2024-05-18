import { IsOptional, IsString } from 'class-validator';

export class BaseDto {
  @IsOptional()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsString()
  createdAt: Date;

  @IsOptional()
  @IsString()
  lastUpdatedBy: string;

  @IsOptional()
  @IsString()
  lastUpdatedAt: Date;
}
