import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  VerticalPropertyName,
  PlacementType,
  LogoRequired,
  CBD,
} from './enums';

@Schema()
export class Publisher {
  @Prop({ required: true })
  companyPropertyName: string;

  @Prop({ required: true, enum: VerticalPropertyName })
  verticalPropertyName: VerticalPropertyName;

  @Prop()
  websiteURL: string;

  @Prop({ required: true, enum: PlacementType })
  placementType: PlacementType;

  @Prop({ required: true })
  emailListSize: string;

  @Prop({ required: true })
  openRate: string;

  @Prop({ required: true })
  CTR: string;

  @Prop({ required: true })
  expectedClicks: string;

  @Prop()
  emailServiceProvider: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  descriptionOfProperty: string;

  @Prop()
  numberOfAdUnit: string;

  @Prop({ required: true, enum: LogoRequired })
  logoRequired: LogoRequired;

  @Prop({ required: true })
  imageSize: string;

  @Prop()
  headlineCopyLength: string;

  @Prop()
  bodyCopyLength: string;

  @Prop({ required: true, enum: CBD })
  CBD: CBD;

  @Prop()
  CTACopyLength: string;

  @Prop()
  editorialCopyLength: string;

  @Prop()
  advanceDays: string;

  @Prop()
  miscNote: string;

  @Prop()
  averageAge: string;

  @Prop()
  HHI: string;

  @Prop({ required: true })
  audienceGEO: string;

  @Prop()
  mobVsDesktop: string;

  @Prop()
  educationalLevel: string;

  @Prop()
  professionalLevel: string;

  @Prop()
  mediaKit: string;

  @Prop()
  dropFileHere: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);

export type PublisherDocument = Publisher & Document;
