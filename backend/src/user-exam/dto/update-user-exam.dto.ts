import { PartialType } from '@nestjs/swagger';
import { CreateUserExamDto } from './create-user-exam.dto';

export class UpdateUserExamDto extends PartialType(CreateUserExamDto) {}
