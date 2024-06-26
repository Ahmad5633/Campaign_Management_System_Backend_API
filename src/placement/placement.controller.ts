import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { PlacementService } from './placement.service';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { Roles } from '../roleBasedAuth/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { JwtAuthGuard } from '../roleBasedAuth/jwt-auth.guard';
import { RolesGuard } from '../roleBasedAuth/roles.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Placement } from './placement.schema';

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
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort_by') sortBy: string = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ): Promise<Placement[]> {
    return this.placementService.findAll(page, limit, sortBy, order);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete a Placemenet by its ID (admin only)' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the palcement to delete',
  })
  @ApiResponse({ status: 204, description: 'Placement deleted successfully' })
  @ApiResponse({ status: 404, description: 'Placement not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Only admin can delete this placemnet',
  })
  async deletePlacement(@Param('id') id: string): Promise<string> {
    const message = await this.placementService.deletePlacement(id);
    return message;
  }
}
