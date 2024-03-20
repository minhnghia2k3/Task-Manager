import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Priority, Status } from 'src/tasks/schemas/tasks.schema';

export class QueryTasksDto {
  /** Filters */
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsEnum(Priority)
  priority: number;

  @IsOptional()
  @IsEnum(Status)
  status: number;

  /** Queries */
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;

  splitToOptions(): { filterOptions: any; queryOptions: any } {
    const filterOptions = {
      title: this.title,
      priority: this.priority,
      status: this.status,
    };

    const queryOptions = {
      limit: this.limit,
      page: this.page,
    };

    return { filterOptions, queryOptions };
  }
}
