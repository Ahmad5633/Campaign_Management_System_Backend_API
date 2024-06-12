// // // src/campaign/campaign.service.ts
// // import { Injectable, BadRequestException,NotFoundException } from '@nestjs/common';
// // import { InjectModel } from '@nestjs/mongoose';
// // import { Model } from 'mongoose';
// // import { Campaign, CampaignDocument } from './campaign.schema';
// // import { CreateCampaignDto, CreateAdvertiserCampaignDto } from './dto/create-campaign.dto';
// // import { v4 as uuidv4 } from 'uuid';

// // @Injectable()
// // export class CampaignService {
// //   constructor(
// //     @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
// //   ) {}

// //   async create(createCampaignDto: CreateCampaignDto | CreateAdvertiserCampaignDto): Promise<Campaign> {
// //     const shareLink = `https://yourdomain.com/campaign/${uuidv4()}`;
// //     let createdCampaign;

// //     if (createCampaignDto.role === 'advertiser') {
// //       createdCampaign = new this.campaignModel({ ...createCampaignDto, shareLink });
// //     } else if (createCampaignDto.role === 'publisher' || createCampaignDto.role === 'admin') {
// //       const { dailyBudget, totalBudget, ...rest } = createCampaignDto as CreateAdvertiserCampaignDto;
// //       if (dailyBudget || totalBudget) {
// //         throw new BadRequestException('Publishers and Admins cannot set budgets.');
// //       }
// //       createdCampaign = new this.campaignModel({ ...rest, shareLink });
// //     } else {
// //       throw new BadRequestException('Invalid role specified.');
// //     }

// //     return createdCampaign.save();
// //   }

// //   async findByShareLink(id: string): Promise<Campaign> {
// //     const campaign = await this.campaignModel.findOne({ shareLink: `https://yourdomain.com/campaign/${id}` }).exec();
// //     if (!campaign) {
// //       throw new NotFoundException('Campaign not found');
// //     }
// //     return campaign;
// //   }

// //   async findAll(): Promise<Campaign[]> {
// //     return this.campaignModel.find().exec();
// //   }
// // }


// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';
// import { Campaign, CampaignDocument } from './campaign.schema';

// @Injectable()
// export class CampaignService {
//   constructor(@InjectModel(Campaign.name) private readonly campaignModel: Model<CampaignDocument>) {}

//   async createCampaign(data: any): Promise<CampaignDocument> {
//     const shareLink = this.generateShareableLink();
//     const newCampaign = new this.campaignModel({ ...data, shareLink });
//     return await newCampaign.save();
//   }

//   private generateShareableLink(): string {
//     return `http://yourdomain.com/campaign/${uuidv4()}`;
//   }


// }


// src/campaign/campaign.service.ts
import { Injectable , NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Campaign, CampaignDocument } from './campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(@InjectModel(Campaign.name) private readonly campaignModel: Model<CampaignDocument>) {}

  async createCampaign(createCampaignDto: CreateCampaignDto): Promise<CampaignDocument> {
    const shareLink = this.generateShareableLink();
    const newCampaign = new this.campaignModel({ ...createCampaignDto, shareLink });
    return await newCampaign.save();
  }

  private generateShareableLink(): string {
    return `http://yourdomain.com/campaign/${uuidv4()}`;
  }

  async findAll(): Promise<Campaign[]> {
    return await this.campaignModel.find().exec();
  }


  async findByShareLink(id: string): Promise<Campaign> {
        const campaign = await this.campaignModel.findOne({ shareLink: `https://yourdomain.com/campaign/${id}` }).exec();
        if (!campaign) {
          throw new NotFoundException('Campaign not found');
        }
        return campaign;
      }
}
