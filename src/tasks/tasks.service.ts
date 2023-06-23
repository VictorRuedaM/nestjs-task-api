import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getOneTask(id: string) {
    const taskFound = await this.taskModel.findById(id);
    return taskFound;
  }
  async getAllTask() {
    return this.taskModel.find();
  }

  async createTask(createTask: CreateTaskDto) {
    const newTask = await new this.taskModel(createTask);
    return newTask.save();
  }

  async updateTask(id: string, updateTask: UpdateTaskDto) {
    const taskUpdated = await this.taskModel.findByIdAndUpdate(id, updateTask, {
      new: true,
    });
    return taskUpdated;
  }
  async deleteTask(id: string) {
    const taskDeleted = await this.taskModel.findByIdAndDelete(id);
    return taskDeleted;
  }
}
