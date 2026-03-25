import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, ProfileModule, AddressModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
