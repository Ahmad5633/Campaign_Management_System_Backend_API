// src/media-management/media-management.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MediaManagement {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  businessType: string;

  @Prop({ required: true })
  adTitle: string;

  @Prop({ required: true })
  adName: string;

  @Prop({ required: true })
  businessTag: string;

  @Prop({ required: true })
  region: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String] })
  uploadImages: string[];
}

export const MediaManagementSchema =
  SchemaFactory.createForClass(MediaManagement);

export type MediaManagementDocument = MediaManagement & Document;
