import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority, Status } from '../../schemas/tasks.schema';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(Priority)
  priority: number;

  @IsOptional()
  @IsEnum(Status)
  status: number;
}
