import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Tasks } from 'src/tasks/schemas/tasks.schema';

@Schema()
export class Users extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  avatar?: string;

  @Prop({ default: 1 })
  isActive: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' }] })
  tasks: Tasks[];
}
export const UsersSchema = SchemaFactory.createForClass(Users);
