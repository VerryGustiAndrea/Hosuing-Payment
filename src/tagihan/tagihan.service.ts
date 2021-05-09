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

  //ADMIN
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

  getlisthistory(date: string): Promise<Tagihan[]> {
    const date1 = new Date(date) //date
    const date2 = new Date(new Date(date).setMonth(new Date(date).getMonth() + 1)) //date + 1 month
    return this.tagihanModel.findAll({
      where: {
        [Op.and]: [{
          date: {
            [Op.between]: [date1, date2],
          }
        }, { [Op.or]: [{ status: 1 }, { status: 2 }], }]
      }
    });
  }

  async inputtagihan(createTagihanDto: CreateTagihanDto) {
    const createdTagihan = new this.tagihanModel({
      user_id: createTagihanDto.user_id,
      stan_meter_awal: createTagihanDto.stan_meter_awal,
      stan_meter_akhir: createTagihanDto.stan_meter_akhir,
      penggunaan: createTagihanDto.penggunaan,
      tagihan_air: createTagihanDto.tagihan_air,
      sampah: createTagihanDto.sampah,
      keamanan: createTagihanDto.keamanan,
      admin: createTagihanDto.admin,
      sub_total_tagihan: createTagihanDto.sub_total_tagihan,
      denda: createTagihanDto.denda,
      grand_total: createTagihanDto.grand_total,
      date: new Date(),
      status: 0,
    })
    console.log(createdTagihan)
    try {
      await createdTagihan.save()
      return createdTagihan
    } catch (error) {
      throw new Error(error);
    }
  }

  //WARGA
  GetTagihanWarga(date: string, user_id: number): Promise<Tagihan[]> {
    const date1 = new Date(date) //date
    const date2 = new Date(new Date(date).setMonth(new Date(date).getMonth() + 1)) //date + 1 month
    return this.tagihanModel.findAll({
      where: {
        [Op.and]: [{
          date: {
            [Op.between]: [date1, date2],
          }
        }, { user_id: user_id }, { status: 0 }]
      }
    });
  }

  gethistorywarga(date: string, user_id: number): Promise<Tagihan[]> {
    const date1 = new Date(date) //date
    const date2 = new Date(new Date(date).setMonth(new Date(date).getMonth() + 1)) //date + 1 month
    return this.tagihanModel.findAll({
      where: {
        [Op.and]: [{
          date: {
            [Op.between]: [date1, date2],
          }
        }, { user_id: user_id }, { [Op.or]: [{ status: 1 }, { status: 2 }], }]
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
