import { PartialType } from '@nestjs/mapped-types';
import { CreateTagihanDto } from './create-tagihan.dto';

export class UpdateTagihanDto extends PartialType(CreateTagihanDto) {}
