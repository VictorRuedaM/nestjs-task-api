import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get(':id')
  getOneTask(@Param('id') id: string) {
    return this.taskService.getOneTask(id);
  }
  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }
  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.taskService.createTask(task);
  }
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    return this.taskService.updateTask(id, task);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
