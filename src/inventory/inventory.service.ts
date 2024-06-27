import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, InventoryDocument } from './inventory.schema';
import { Campaign, CampaignDocument } from '../campaign/campaign.schema';
import { Placement, PlacementDocument } from '../placement/placement.schema';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name)
    private inventoryModel: Model<InventoryDocument>,
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(Placement.name)
    private placementModel: Model<PlacementDocument>,
  ) {}
  async createInventoryWithIds(
    campaignId: string,
    placementId: string,
    inventoryData: Partial<Inventory>,
  ): Promise<Inventory> {
    const campaign = await this.campaignModel.findById(campaignId).exec();
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    const placement = await this.placementModel.findById(placementId).exec();
    if (!placement) {
      throw new NotFoundException(`Placement with ID ${placementId} not found`);
    }

    const createdInventory = new this.inventoryModel({
      campaign,
      placement,
      ...inventoryData,
    });

    return createdInventory.save();
  }
  async createInventory(inventoryData: Partial<Inventory>): Promise<Inventory> {
    const createdInventory = new this.inventoryModel(inventoryData);
    return createdInventory.save();
  }

  async findAllInventory(): Promise<Inventory[]> {
    return this.inventoryModel.find().exec();
  }

  async findInventoryById(id: string): Promise<Inventory> {
    return this.inventoryModel.findById(id).exec();
  }

  async updateInventory(
    id: string,
    inventoryData: Partial<Inventory>,
  ): Promise<Inventory> {
    return this.inventoryModel
      .findByIdAndUpdate(id, inventoryData, { new: true })
      .exec();
  }

  async deleteInventory(id: string): Promise<Inventory> {
    return this.inventoryModel.findByIdAndDelete(id).exec();
  }
}
