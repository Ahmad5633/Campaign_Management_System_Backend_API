import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Campaign, CampaignSchema } from '../campaign/campaign.schema';
import { Placement, PlacementSchema } from '../placement/placement.schema';

export enum InventoryStatus {
  REJECTED = 'rejected',
  PAUSED = 'paused',
  PENDING = 'pending',
  ENABLE = 'enable',
  ENDED = 'ended',
}

export enum InventoryAction {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

@Schema()
export class Inventory {
  @Prop({ type: CampaignSchema, required: true })
  campaign: Campaign;

  @Prop({ type: PlacementSchema, required: true })
  placement: Placement;

  @Prop({ enum: InventoryStatus, default: InventoryStatus.PENDING })
  status: string;

  @Prop({ enum: InventoryAction, default: InventoryAction.PENDING })
  action: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  budget: number;

  @Prop({ required: true })
  clicks: number;

  @Prop({ required: true })
  conversions: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

export type InventoryDocument = Inventory & Document;
