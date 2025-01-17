import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { name, password, email, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      name,
      password: hashedPassword,
      email,
      role,
    });

    return user.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
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

  async findUserById(id: string): Promise<User | undefined> {
    return this.userModel.findById({ id }).exec();
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

  async findAllPublishers(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    order: 'asc' | 'desc' = 'asc',
  ): Promise<User[]> {
    const offset = (page - 1) * limit;
    const sortQuery: { [key: string]: 'asc' | 'desc' } = {};
    sortQuery[sortBy] = order;

    return this.userModel
      .find({ role: 'publisher' })
      .sort(sortQuery)
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async findAllAdvertisers(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    order: 'asc' | 'desc' = 'asc',
  ): Promise<User[]> {
    const offset = (page - 1) * limit;
    const sortQuery: { [key: string]: 'asc' | 'desc' } = {};
    sortQuery[sortBy] = order;

    return this.userModel
      .find({ role: 'advertiser' })
      .sort(sortQuery)
      .skip(offset)
      .limit(limit)
      .exec();
  }
}
