import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Tasks } from './schemas/tasks.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TasksService } from './tasks.service';
import { CurrentUser } from 'src/auth/auth.decorator';
import { UsersResponse } from 'src/users/dto/response/user-response.dto';
import { QueryTasksDto } from './dto/request/query-tasks-dto';
import { CreateTaskDto } from './dto/request/create-task-dto';
import { UserActiveGuard } from 'src/users/guards/user_active.guard';
import { ParamsDto } from './dto/request/params.dto';
import { UpdateTaskDto } from './dto/request/update-task-dto';
import { ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer-options';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard, UserActiveGuard)
  @Get()
  async listTasks(
    @CurrentUser() user: UsersResponse,
    @Query() queryTasksDto: QueryTasksDto,
  ) {
    return await this.tasksService.listTasks(user._id, queryTasksDto);
  }

  @UseGuards(JwtAuthGuard, UserActiveGuard)
  @Get(':task_id')
  @ApiParam({
    name: 'task_id',
    required: true,
    description: 'Identify task id.',
  })
  async getTask(
    @CurrentUser() user: UsersResponse,
    @Param() paramsDto: ParamsDto,
  ): Promise<Tasks> {
    return await this.tasksService.getTask(user._id, paramsDto.task_id);
  }

  @UseGuards(JwtAuthGuard, UserActiveGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createTask(
    @CurrentUser() user: UsersResponse,
    @Body() createTaskDto: CreateTaskDto,
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<Tasks> {
    createTaskDto.image = image?.filename;
    return await this.tasksService.createTask(user._id, createTaskDto);
  }

  // TODO: handle remove old image when update task
  @UseGuards(JwtAuthGuard, UserActiveGuard)
  @Put(':task_id')
  @ApiParam({
    name: 'task_id',
    required: true,
    description: 'Identify task id.',
  })
  async updateTask(
    @CurrentUser() user: UsersResponse,
    @Param() { task_id }: ParamsDto,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Tasks> {
    return await this.tasksService.updateTask(user._id, task_id, updateTaskDto);
  }
  @UseGuards(JwtAuthGuard, UserActiveGuard)
  @Delete(':task_id')
  @ApiParam({
    name: 'task_id',
    required: true,
    description: 'Identify task id.',
  })
  async cancelTask(
    @CurrentUser() user: UsersResponse,
    @Param() { task_id }: ParamsDto,
  ): Promise<Tasks> {
    return await this.tasksService.deleteTask(user._id, task_id);
  }
}
