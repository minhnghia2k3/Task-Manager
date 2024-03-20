import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Users } from 'src/users/schemas/users.schema';

export enum Priority {
  low = 0,
  normal = 1,
  urgency = 2,
}

export enum Status {
  cancel = 0,
  pending = 1,
  done = 2,
}

@Schema({ timestamps: true })
export class Tasks extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', index: true })
  author: Users;

  @Prop({ required: true })
  title: string;

  @Prop()
  image?: string;

  @Prop()
  description?: string;

  @Prop({
    default: Priority.low,
    enum: [Priority.low, Priority.normal, Priority.urgency],
    index: true,
  })
  priority: Priority;

  @Prop({
    default: Status.pending,
    enum: [Status.cancel, Status.pending, Status.done],
    index: true,
  })
  status: Status;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
