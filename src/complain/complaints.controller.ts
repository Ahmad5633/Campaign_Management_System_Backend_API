import { Controller, Post, Get, Body } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  async create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintsService.createComplaint(createComplaintDto);
  }

  @Get()
  async findAll() {
    return this.complaintsService.getAllComplaints();
  }
}
