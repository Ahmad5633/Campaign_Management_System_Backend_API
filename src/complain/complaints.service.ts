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

  async getAllComplaints(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    order: 'asc' | 'desc' = 'asc',
  ): Promise<Complaint[]> {
    const offset = (page - 1) * limit;

    const sortQuery: { [key: string]: 'asc' | 'desc' } = {};
    sortQuery[sortBy] = order;

    return this.complaintModel
      .find()
      .sort(sortQuery)
      .skip(offset)
      .limit(limit)
      .exec();
  }
}
