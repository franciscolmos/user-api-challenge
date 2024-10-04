import { Controller, Post, Get, Patch, Body, Param, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { multerOptions } from '../multer.config';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture', multerOptions))
  async createUser(
    @Body() userData: Omit<User, 'profilePicture'>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const profilePicture = file ? file.filename : null;
    return this.userService.create({ ...userData, profilePicture });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() userData) {
    return this.userService.update(id, userData);
  }
}