import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schema/message.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  private toObjectId(id: string): ObjectId {
    try {
      return new ObjectId(id);
    } catch (error) {
      throw new BadRequestException(`Invalid ObjectId: ${id}`);
    }
  }

  async createMessage(
    senderId: string,
    recipientId: string,
    content: string,
  ): Promise<Message> {
    const message = new this.messageModel({
      sender: this.toObjectId(senderId),
      recipient: this.toObjectId(recipientId),
      content,
      timestamp: new Date(),
    });
    return message.save();
  }

  async getMessages(userId: string): Promise<Message[]> {
    const objectId = this.toObjectId(userId);
    return this.messageModel
      .find({
        $or: [{ sender: objectId }, { recipient: objectId }],
      })
      .exec();
  }
}
