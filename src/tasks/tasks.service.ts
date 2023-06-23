import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getOneTask(id: string) {
    try {
      const taskFound = await this.taskModel.findById(id);
      if (!taskFound) {
        throw new HttpException('Tasks Not Found In DB', HttpStatus.NOT_FOUND);
      }
      return taskFound;
    } catch (error) {
      throw error;
    }
  }
  async getAllTasks() {
    try {
      const tasksFound = await this.taskModel.find();
      if (!tasksFound.length) {
        throw new HttpException('Tasks Not Found In DB', HttpStatus.NOT_FOUND);
      }
      return tasksFound;
    } catch (error) {
      throw error;
    }
  }

  async createTask(createTask: CreateTaskDto) {
    try {
      const newTask = new this.taskModel(createTask);
      return await newTask.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task Already Exists');
      }
      throw error;
    }
  }

  async updateTask(id: string, updateTask: UpdateTaskDto) {
    try {
      const taskFound = await this.taskModel.findById(id);
      if (!taskFound) {
        throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
      }
      const taskUpdated = await this.taskModel.findByIdAndUpdate(
        id,
        updateTask,
        {
          new: true,
        },
      );
      return taskUpdated;
    } catch (error) {
      throw error;
    }
  }
  async deleteTask(id: string) {
    try {
      const taskDeleted = await this.taskModel.findByIdAndDelete(id);
      if (!taskDeleted) {
        throw new HttpException('Task Not Found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }
}
