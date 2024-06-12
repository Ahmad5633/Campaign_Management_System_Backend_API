import { Controller, Get, Post, Body, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { PlacementService } from './placement.service';
import { CreatePlacementDto } from './dto/create-placement.dto';

@Controller('placements')
export class PlacementController {
  constructor(private readonly placementService: PlacementService) {}

  @Post()
  async create(@Body() createPlacementDto: CreatePlacementDto, @Request() req) {
    return this.placementService.create(createPlacementDto);
  }

  @Get()
  async findAll() {
    return this.placementService.findAll();
  }

}
