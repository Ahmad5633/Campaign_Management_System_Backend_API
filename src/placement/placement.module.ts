import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacementService } from './placement.service';
import { PlacementController } from './placement.controller';
import { Placement, PlacementSchema } from './placement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Placement.name, schema: PlacementSchema },
    ]),
  ],
  controllers: [PlacementController],
  providers: [PlacementService],
  exports: [PlacementService],
})
export class PlacementModule {}
