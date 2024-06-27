import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.schema';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async createInventory(
    @Body() inventoryData: Partial<Inventory>,
  ): Promise<Inventory> {
    return this.inventoryService.createInventory(inventoryData);
  }

  @Post('create/:campaignId/:placementId')
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
  async findAllInventory(): Promise<Inventory[]> {
    return this.inventoryService.findAllInventory();
  }

  @Get(':id')
  async findInventoryById(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.findInventoryById(id);
  }

  @Put(':id')
  async updateInventory(
    @Param('id') id: string,
    @Body() inventoryData: Partial<Inventory>,
  ): Promise<Inventory> {
    return this.inventoryService.updateInventory(id, inventoryData);
  }

  @Delete(':id')
  async deleteInventory(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.deleteInventory(id);
  }
}
