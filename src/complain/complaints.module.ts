import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';
import { ComplaintSchema } from './complaint.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Complaint', schema: ComplaintSchema }]),
  ],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
})
export class ComplaintsModule {}
