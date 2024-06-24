import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserRole } from './user-role.enum';
@Schema({ discriminatorKey: 'role' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop()
  filename: string;

  @Prop()
  originalname: string;

  @Prop()
  mimetype: string;

  @Prop()
  size: number;

  @Prop()
  buffer: Buffer;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
