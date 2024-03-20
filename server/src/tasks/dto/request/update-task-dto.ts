import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority, Status } from 'src/tasks/schemas/tasks.schema';

export class UpdateTaskDto {
  @IsOptional()
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
  priority: Priority;

  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
