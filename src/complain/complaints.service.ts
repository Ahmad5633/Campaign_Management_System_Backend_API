// import { Injectable } from '@nestjs/common';
// import { CreateComplaintDto } from './dto/create-complaint.dto';

// @Injectable()
// export class ComplaintsService {
//   private complaints: CreateComplaintDto[] = [];

//   createComplaint(createComplaintDto: CreateComplaintDto) {
//     const newComplaint = { ...createComplaintDto };
//     this.complaints.push(newComplaint);
//     return newComplaint;
//   }

//   getAllComplaints() {
//     return this.complaints;
//   }
// }

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { Complaint } from './complaint.schema';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectModel('Complaint') private readonly complaintModel: Model<Complaint>,
  ) {}

  async createComplaint(
    createComplaintDto: CreateComplaintDto,
  ): Promise<Complaint> {
    const createdComplaint = new this.complaintModel(createComplaintDto);
    return await createdComplaint.save();
  }

  async getAllComplaints(): Promise<Complaint[]> {
    return await this.complaintModel.find().exec();
  }
}
