import * as bcrypt from 'bcrypt';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData): Promise<User> {
    const existUser = await this.findOne(userData.username);
    if(existUser){
      throw new ConflictException("Username already exist");
    }
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username): Promise<User> {
    return this.userModel.findOne({username}).exec();
  }

  async update(id: string, userData): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
  }
}