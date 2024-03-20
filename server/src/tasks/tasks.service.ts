import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryTasksDto } from './dto/request/query-tasks-dto';
import { TasksRepository } from './tasks.repository';
import { Tasks } from './schemas/tasks.schema';
import { CreateTaskDto } from './dto/request/create-task-dto';
import { ListTasksResponse } from './dto/response/list-tasks-response.dto';
import { UpdateTaskDto } from './dto/request/update-task-dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  /**
   * This function list tasks from database.
   * Base on `queryOptions` include optionals params: `limit`, `page`, `query`
   * By default:
   * - `limit` = 10
   * - `page` = 1
   * - `query` = null
   * Example URL: [GET] /tasks?page=1&limit=5&title=abc&priority=2&status=0
   * @param userId
   * @param queryOptions
   * @returns ListTasksResponse
   */
  async listTasks(
    userId: string,
    queryTasksDto: QueryTasksDto,
  ): Promise<ListTasksResponse> {
    const { filterOptions, queryOptions } = queryTasksDto.splitToOptions();
    const skipUnit = queryTasksDto.limit * (queryTasksDto.page - 1);

    // Thêm điều kiện tìm kiếm theo tên nếu có
    if (queryTasksDto.title) {
      filterOptions.title = {
        $regex: new RegExp(queryTasksDto.title, 'iu'),
      };
    }

    // Lọc các dữ liệu undefined khỏi object
    const filteredFilterOptions = this.removeUndefinedFromObject(filterOptions);

    const list = await this.tasksRepository.listTasks(
      { ...filteredFilterOptions, author: userId, status: { $ne: 0 } },
      {
        ...queryOptions,
        page: skipUnit,
      },
    );

    return await this.buildListResponse(list, userId, queryTasksDto);
  }

  /**
   * Create new task.
   * - `author` default is current user id
   * - `CreateTaskDto` is payload body.
   * @param userId
   * @param createTaskDto
   * @returns
   */
  async createTask(userId: string, createTaskDto: CreateTaskDto) {
    return await this.tasksRepository.createTask(userId, createTaskDto);
  }

  /**
   * Get a current user's task by id.
   * @param userId
   * @param taskId
   * @returns Tasks
   */
  async getTask(userId: string, taskId: string): Promise<Tasks> {
    const task = await this.tasksRepository.findOne(userId, taskId);
    if (!task) {
      throw new NotFoundException('Not found task by id.');
    }
    return task;
  }

  /**
   * Update a `userId`'s task by `taskId` with payload of `updateTaskDto`
   * @param userId
   * @param taskId
   * @param updateTaskDto
   * @returns
   */
  async updateTask(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Tasks> {
    const task = await this.tasksRepository.updateTask(
      userId,
      taskId,
      updateTaskDto,
    );
    if (!task) {
      throw new NotFoundException('Not found task by id.');
    }
    return task;
  }

  /**
   * Delete a `userId`'s task by `taskId`
   * Specifically, update field `status` = 0
   * @param userId
   * @param taskId
   * @returns Tasks
   */
  async deleteTask(userId: string, taskId: string): Promise<Tasks> {
    const task = await this.tasksRepository.softDeleteTask(userId, taskId);
    if (!task) {
      throw new NotFoundException('Not found task by id.');
    }
    return task;
  }

  /**
   * Remove undefined fields from object
   */
  private removeUndefinedFromObject(object: any) {
    return Object.fromEntries(
      Object.entries(object).filter(([_, value]) => value !== undefined),
    );
  }

  /**
   * Takes in `list` of tasks and `queryTasksDto`
   * @param list
   * @param queryTaskDto
   * @returns Promise<ListTasksResponse>
   */
  private async buildListResponse(
    list: Tasks[],
    userId: string,
    queryTaskDto: QueryTasksDto,
  ): Promise<ListTasksResponse> {
    const totalPage = Math.ceil(
      (await this.tasksRepository.totalTasks(userId)) / queryTaskDto.limit,
    );
    return {
      info: {
        totalPage: totalPage,
        currentPage: queryTaskDto.page,
        unit: list.length,
      },
      data: [...list],
    };
  }
}
