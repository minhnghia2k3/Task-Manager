import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Users } from 'src/users/schemas/users.schema';

enum Priority {
  cancel = 'Cancel',
  pending = 'Pending',
  done = 'Done',
}

enum Status {
  low = 'Low',
  normal = 'Normal',
  urgency = 'Urgency',
}

@Schema()
export class Tasks extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  author: Users;

  @Prop({ required: true })
  title: string;

  @Prop()
  image?: string;

  @Prop()
  description?: string;

  @Prop({ default: Priority.pending })
  priority: Priority;

  @Prop({ default: Status.low })
  status: Status;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
