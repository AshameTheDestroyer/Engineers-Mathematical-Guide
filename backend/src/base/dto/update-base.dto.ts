import { PartialType } from '@nestjs/swagger';
import { CreateBaseDto } from './create-base.dto';

export class UpdateBaseDto extends PartialType(CreateBaseDto) {}
