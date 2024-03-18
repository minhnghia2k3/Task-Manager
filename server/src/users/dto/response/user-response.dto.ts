import { Tasks } from 'src/tasks/schemas/tasks.schema';

export class UsersResponse {
  _id: string;
  email: string;
  avatar: string;
  isActive: boolean;
  tasks: Tasks[];
}
