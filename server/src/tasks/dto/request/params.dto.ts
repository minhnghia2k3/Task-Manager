import { IsMongoId } from 'class-validator';

export class ParamsDto {
  @IsMongoId()
  task_id: string;
}
