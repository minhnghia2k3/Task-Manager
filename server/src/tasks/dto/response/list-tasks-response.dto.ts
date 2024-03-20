import { Tasks } from 'src/tasks/schemas/tasks.schema';

export class ListTasksResponse {
  info: {
    totalPage: number;
    currentPage: number;
    unit: number;
  };
  data: Tasks[];
}
