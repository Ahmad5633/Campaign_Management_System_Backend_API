import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(user: User): Promise<User> {
    const hashedPassword = await this.hashPassword(user.password);
    const createdUser = new this.userModel({
      ...user,
      password: hashedPassword,
    });
    console.log(createdUser);
    return await createdUser.save();
  }

  async updatePasswordByEmail(
    email: string,
    newPassword: string,
  ): Promise<string> {
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userModel
      .updateOne({ email }, { password: hashedPassword })
      .exec();
    return 'Password has been Updated Successfully';
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUserPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async isValidUser(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    return !!user;
  }

  async findAllAdvertisers(): Promise<User[]> {
    return this.userModel.find({ role: 'advertiser' }).exec();
  }

  async findAllPublishers(): Promise<User[]> {
    return this.userModel.find({ role: 'publisher' }).exec();
  }
}
