import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from './campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async createCampaign(
    createCampaignDto: CreateCampaignDto,
  ): Promise<CampaignDocument> {
    const createdCampaign = new this.campaignModel(createCampaignDto);
    createdCampaign.shareLink = `http://example.com/campaign/${createdCampaign._id}`;
    return createdCampaign.save();
  }

  async findAll(
    page: number,
    limit: number,
    sortBy: string,
    order: string,
  ): Promise<Campaign[]> {
    return this.campaignModel
      .find()
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findByShareLink(id: string): Promise<Campaign> {
    const campaign = await this.campaignModel.findById(id).exec();
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    return campaign;
  }

  async deleteCampaign(id: string): Promise<Campaign> {
    return await this.campaignModel.findByIdAndDelete(id).exec();
  }
}
