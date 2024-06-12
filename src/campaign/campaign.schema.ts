// src/campaign/schemas/campaign.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema()
export class Campaign {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  landingPage: string;

  @Prop({ required: true })
  UTMStructure: string;

  @Prop({ required: true })
  performanceMetrices: string;

  @Prop()
  UTMParameters: string;

  @Prop({ required: true })
  placementType: string;

  @Prop({ required: true })
  schedule: string;

  @Prop()
  bussinessTags: string;

  @Prop({ required: true })
  targetMarket: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  adGoal: string;
  
  @Prop()
  shareLink: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
