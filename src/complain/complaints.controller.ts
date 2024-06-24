import { Controller, Post, Get, Body } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Complaints')
@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new complaint' })
  @ApiBody({ type: CreateComplaintDto })
  @ApiResponse({ status: 201, description: 'Complaint created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintsService.createComplaint(createComplaintDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all complaints' })
  @ApiResponse({ status: 200, description: 'List of all complaints' })
  async findAll() {
    return this.complaintsService.getAllComplaints();
  }
}
