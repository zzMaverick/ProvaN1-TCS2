import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto) {
    const existingAddress = await this.prisma.address.findUnique({
      where: { userId: createAddressDto.userId },
    });

    if (existingAddress) {
      throw new ConflictException('Este usuário já possui um endereço cadastrado.');
    }

    return this.prisma.address.create({
      data: createAddressDto,
    });
  }

  findAll() {
    return this.prisma.address.findMany();
  }

  async findOne(id: string) {
    const address = await this.prisma.address.findUnique({
      where: { id },
    });
    
    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }
    
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    await this.findOne(id);
    
    return this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    
    return this.prisma.address.delete({
      where: { id },
    });
  }
}