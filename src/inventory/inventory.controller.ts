import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.schema';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new inventory' })
  @ApiBody({ type: Inventory })
  @ApiResponse({
    status: 201,
    description: 'The inventory has been successfully created.',
  })
  async createInventory(
    @Body() inventoryData: Partial<Inventory>,
  ): Promise<Inventory> {
    return this.inventoryService.createInventory(inventoryData);
  }

  @Post('create/:campaignId/:placementId')
  @ApiOperation({
    summary: 'Create a new inventory with campaign and placement IDs',
  })
  @ApiParam({ name: 'campaignId', type: String, description: 'Campaign ID' })
  @ApiParam({ name: 'placementId', type: String, description: 'Placement ID' })
  @ApiBody({ type: Inventory })
  @ApiResponse({
    status: 201,
    description: 'The inventory has been successfully created.',
  })
  async createInventoryWithIds(
    @Param('campaignId') campaignId: string,
    @Param('placementId') placementId: string,
    @Body() inventoryData: Partial<Inventory>,
  ): Promise<Inventory> {
    return this.inventoryService.createInventoryWithIds(
      campaignId,
      placementId,
      inventoryData,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all inventories' })
  @ApiResponse({ status: 200, description: 'Returns all inventories.' })
  async findAllInventory(): Promise<Inventory[]> {
    return this.inventoryService.findAllInventory();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an inventory by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Inventory ID' })
  @ApiResponse({ status: 200, description: 'Returns the inventory.' })
  async findInventoryById(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.findInventoryById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an inventory by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Inventory ID' })
  @ApiBody({ type: Inventory })
  @ApiResponse({ status: 200, description: 'Returns the updated inventory.' })
  async updateInventory(
    @Param('id') id: string,
    @Body() inventoryData: Partial<Inventory>,
  ): Promise<Inventory> {
    return this.inventoryService.updateInventory(id, inventoryData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an inventory by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Inventory ID' })
  @ApiResponse({ status: 200, description: 'Returns the deleted inventory.' })
  async deleteInventory(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.deleteInventory(id);
  }
}
