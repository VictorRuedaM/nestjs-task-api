import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  title: string;
  @Prop({
    required: true,
    trim: true,
  })
  description: string;
  @Prop({
    default: false,
  })
  done: boolean;
}

export const taskSchema = SchemaFactory.createForClass(Task);
