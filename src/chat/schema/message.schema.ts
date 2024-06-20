import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  sender: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  recipient: mongoose.Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
