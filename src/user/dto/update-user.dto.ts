import { PartialType } from '@nestjs/swagger';
import { CreateUserUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserUserDto) {}