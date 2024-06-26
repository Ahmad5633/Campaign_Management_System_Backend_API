import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Campaign, CampaignDocument } from './campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name)
    private readonly campaignModel: Model<CampaignDocument>,
  ) {}

  async createCampaign(
    createCampaignDto: CreateCampaignDto,
  ): Promise<CampaignDocument> {
    const newCampaign = new this.campaignModel(createCampaignDto);
    const savedCampaign = await newCampaign.save();
    savedCampaign.shareLink = `http://yourdomain.com/campaign/${savedCampaign._id}`;
    await savedCampaign.save();

    return savedCampaign;
  }

  async findAll(
    page: number,
    limit: number,
    sortBy: string,
    order: 'asc' | 'desc',
  ): Promise<Campaign[]> {
    const offset = (page - 1) * limit;

    const sortQuery: { [key: string]: 'asc' | 'desc' } = {};
    sortQuery[sortBy] = order;

    return this.campaignModel
      .find()
      .sort(sortQuery)
      .skip(offset)
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
    return await this.campaignModel.findByIdAndDelete(id);
  }
}
