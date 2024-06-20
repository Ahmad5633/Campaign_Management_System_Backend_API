import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserRole = 'advertiser' | 'publisher' | 'admin';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, enum: ['advertiser', 'publisher', 'admin'] })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
