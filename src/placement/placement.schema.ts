import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlacementDocument = Placement & Document;

@Schema()
export class Placement {
  @Prop({ required: true })
  publisher: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  numberOfPlacements: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  CTR: string;

  @Prop({ required: true })
  emailServiceProvider: string;

  @Prop({ required: true })
  logoRequired: string;

  @Prop({ required: true })
  imageSize: string;
}

export const PlacementSchema = SchemaFactory.createForClass(Placement);
