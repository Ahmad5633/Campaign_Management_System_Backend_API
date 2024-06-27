import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './inventory.schema';
import { Campaign, CampaignSchema } from '../campaign/campaign.schema';
import { Placement, PlacementSchema } from '../placement/placement.schema';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: Placement.name, schema: PlacementSchema },
    ]),
  ],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService],
})
export class InventoryModule {}
