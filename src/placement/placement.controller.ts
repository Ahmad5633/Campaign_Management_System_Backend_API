import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { PlacementService } from './placement.service';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Placements')
@Controller('placements')
export class PlacementController {
  constructor(private readonly placementService: PlacementService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new placement' })
  @ApiBody({
    description: 'Details of the new placement',
    type: CreatePlacementDto,
  })
  @ApiResponse({ status: 201, description: 'Placement created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(@Body() createPlacementDto: CreatePlacementDto, @Request() req) {
    return this.placementService.create(createPlacementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all placements' })
  @ApiResponse({ status: 200, description: 'List of all placements' })
  async findAll() {
    return this.placementService.findAll();
  }
}
