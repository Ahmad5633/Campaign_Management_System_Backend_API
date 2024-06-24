import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { PlacementService } from './placement.service';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { Roles } from '../login/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Delete a Campaign by its ID (admin only)' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the campaign to delete',
  })
  @ApiResponse({ status: 204, description: 'Campaign deleted successfully' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Only admin can delete this campaign',
  })
  async deletePlacement(@Param('id') id: string): Promise<string> {
    const message = await this.placementService.deletePlacement(id);
    return message;
  }
}
