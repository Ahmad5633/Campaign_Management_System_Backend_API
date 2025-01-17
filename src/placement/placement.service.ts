import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Placement, PlacementDocument } from './placement.schema';
import { CreatePlacementDto } from './dto/create-placement.dto';

@Injectable()
export class PlacementService {
  constructor(
    @InjectModel(Placement.name)
    private placementModel: Model<PlacementDocument>,
  ) {}

  async create(createPlacementDto: CreatePlacementDto): Promise<Placement> {
    const newPlacement = new this.placementModel(createPlacementDto);
    return newPlacement.save();
  }

  async findAll(
    page: number,
    limit: number,
    sortBy: string,
    order: 'asc' | 'desc',
  ): Promise<Placement[]> {
    const offset = (page - 1) * limit;

    const sortQuery: { [key: string]: 'asc' | 'desc' } = {};
    sortQuery[sortBy] = order;

    return this.placementModel
      .find()
      .sort(sortQuery)
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async deletePlacement(id: string): Promise<string> {
    const deletedPlacement = await this.placementModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedPlacement) {
      throw new NotFoundException('Placement not found');
    }

    return `Placement with ID ${id} has been successfully deleted`;
  }
}
