import { Injectable } from '@nestjs/common';
import { CreateTagihanDto } from './dto/create-tagihan.dto';
import { UpdateTagihanDto } from './dto/update-tagihan.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tagihan } from './tagihan.model';
const { Op } = require("sequelize");


@Injectable()
export class TagihanService {
  constructor(
    @InjectModel(Tagihan)
    private tagihanModel: typeof Tagihan,
  ) { }

  findAll() {
    return `This action returns all tagihan`;
  }
  // WHERE MONTH(happened_at) = 1 AND YEAR(happened_at) = 2009
  GetListTagihan(date: string): Promise<Tagihan[]> {
    const date1 = new Date(date) //date
    const date2 = new Date(new Date(date).setMonth(new Date(date).getMonth() + 1)) //date + 1 month
    return this.tagihanModel.findAll({
      where: {
        date: {
          [Op.between]: [date1, date2],
        }
      }
    });
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
