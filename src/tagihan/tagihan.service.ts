import { Injectable } from '@nestjs/common';
import { CreateTagihanDto } from './dto/create-tagihan.dto';
import { UpdateTagihanDto } from './dto/update-tagihan.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tagihan } from './tagihan.model';


@Injectable()
export class TagihanService {
  constructor(
    @InjectModel(Tagihan)
    private tagihanModel: typeof Tagihan,
  ) { }

  findAll() {
    return `This action returns all tagihan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tagihan`;
  }

  create(createTagihanDto: CreateTagihanDto) {
    return 'This action adds a new tagihan';
  }

  update(id: number, updateTagihanDto: UpdateTagihanDto) {
    return `This action updates a #${id} tagihan`;
  }

  remove(id: number) {
    return `This action removes a #${id} tagihan`;
  }
}
