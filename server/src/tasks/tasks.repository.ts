import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from './schemas/tasks.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateTaskDto } from './dto/request/create-task-dto';
import { UpdateTaskDto } from './dto/request/update-task-dto';

interface QueryOptions {
  limit: number;
  page: number;
}

export class TasksRepository {
  constructor(@InjectModel(Tasks.name) private tasksModel: Model<Tasks>) {}

  async listTasks(
    filterOptions: FilterQuery<Tasks>,
    queryOptions: QueryOptions,
  ): Promise<Tasks[]> {
    return await this.tasksModel
      .find(filterOptions)
      .sort({ priority: -1, createdAt: 1 })
      .limit(queryOptions.limit)
      .skip(queryOptions.page);
  }

  async totalTasks(userId: string) {
    return await this.tasksModel.countDocuments({ author: userId });
  }

  async findOne(userId: string, taskId: string): Promise<Tasks> {
    return await this.tasksModel.findOne({
      author: userId,
      _id: taskId,
    });
  }

  async createTask(
    userId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Tasks> {
    return await this.tasksModel.create({ ...createTaskDto, author: userId });
  }

  async updateTask(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Tasks> {
    return await this.tasksModel.findOneAndUpdate(
      { author: userId, _id: taskId },
      updateTaskDto,
      { new: true },
    );
  }

  async softDeleteTask(userId: string, taskId: string): Promise<Tasks> {
    return await this.tasksModel.findOneAndUpdate(
      { author: userId, _id: taskId },
      { status: 0 },
      { new: true },
    );
  }
}
