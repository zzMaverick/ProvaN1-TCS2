import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  create(createProfileDto: CreateProfileDto) {
    return this.prisma.profile.create({
      data: createProfileDto,
    });
  }

  findAll() {
    return this.prisma.profile.findMany();
  }

  async findOne(id: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
    });
    
    if (!profile) {
      throw new NotFoundException('Perfil não encontrado');
    }
    
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    await this.findOne(id);
    
    return this.prisma.profile.update({
      where: { id },
      data: updateProfileDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    
    return this.prisma.profile.delete({
      where: { id },
    });
  }
}