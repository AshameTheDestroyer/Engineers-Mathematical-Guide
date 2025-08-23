import { PartialType } from '@nestjs/swagger';
import { CreateFollowerDto } from './create-follower.dto';

export class UpdateFollowerDto extends PartialType(CreateFollowerDto) {}
