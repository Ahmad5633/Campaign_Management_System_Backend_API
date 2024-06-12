import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Advertiser {

  @Prop({ required: true })
  advertiserName: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true})
  email: string;

  @Prop({ required: true })
  invoicingContactName: string;

  @Prop({ required: true })
  emailForSendInvoice: string;

  @Prop({ required: true })
  invoicingMainlingAddress: string;

  @Prop({ required: true })
  primaryContact: string;

  @Prop()
  additionalContact: string;

  @Prop()
  legalDisclaimer: string;

  @Prop({ required: true })
  landingPage: string;

  @Prop({ required: true })
  UTM : string;

  @Prop()
  promoCode: string;

  @Prop()
  mainValueProposition: string;

  @Prop()
  apartFromCompetitors: string;

  @Prop({ required: true })
  specialProducts: string;

  @Prop()
  barriorToPurchase: string;

  @Prop()
  anythingToMension: string;

  @Prop()
  successfulMessage: string;

  @Prop()
  targetPerformanceMetrices: string;

  @Prop()
  logo: String;

  @Prop()
  specificUTMParameters: string;

  @Prop({ required: true})
  mediaIntercept: string;

  @Prop()
  dropFileHere: [string];
}

export const AdvertiserSchema = SchemaFactory.createForClass(Advertiser);

export type AdvertiserDocument = Advertiser & Document;
