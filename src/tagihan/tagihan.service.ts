import { Injectable } from '@nestjs/common';
import { CreateTagihanDto, CreateTagihanImage } from './dto/create-tagihan.dto';
import { UpdateTagihanDto } from './dto/update-tagihan.dto';
import { ApprovalTagihanDto } from './dto/approval-tagihan.dto';
import { CheckoutTagihanDto } from './dto/checkout-tagihan.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tagihan } from './tagihan.model';
import response from 'src/library/response';
const { Op } = require("sequelize");
const axios = require('axios')

// import fs from 'fs';
var fs = require('fs');
import { User } from 'src/user/user.model';


@Injectable()
export class TagihanService {
  constructor(
    @InjectModel(Tagihan)
    private tagihanModel: typeof Tagihan,
    // private userModel: typeof User,
  ) { }

  //ADMIN
  // async sendEmail(email: string, name: string) {
  //   await this.mailService.sendTagihanInfo(email, name);
  // }




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

    try {
      //create tagihan
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
        date: createTagihanDto.date,
        status: 0,
      })
      const responseCreateTagihan = await createdTagihan.save()

      //request payment to ipaymu
      const dataIpaymu = {
        key: "86ED9DE0-1179-4805-B019-07D147C53716",
        action: "payment",
        product: "Tagihan bulan " + `${new Date(createTagihanDto.date).toDateString()}`,
        price: 123123,
        quantity: 1,
        comments: "Tagihan bulan " + `${new Date(createTagihanDto.date).getMonth() + 1} Tahun ` + `${new Date(createTagihanDto.date).getFullYear()}`,
        // ureturn: `http://${process.env.APP_HOST}:3000/tagihan/return/` + responseCreateTagihan.id,
        ureturn: "http://payment_return",
        unotify: `http://${process.env.APP_HOST}:3000/tagihan/approval/` + responseCreateTagihan.user_id,
        ucancel: "http://payment_cancel",
        format: "json",
        //weight:0.5
        //dimensi:1:2:1
        //postal_code:80361
        //address:Jalan raya Kuta, No. 88 R, Badung, Bali
        //auto_redirect:10
        // expired: 24,
        //pay_method:
        //pay_channel:
        buyer_name: "Alex",
        buyer_phone: "08123456789asd",
        buyer_email: "buyer@mail.com",
        reference_id: new Date().valueOf()
      }

      const response = await axios.post('https://sandbox.ipaymu.com/payment', dataIpaymu, {
      })

      //update database
      const dataUpdate = {
        session_id: response.data.sessionID,
        url: response.data.url
      }
      await this.tagihanModel.update(dataUpdate, { where: { id: responseCreateTagihan.id } });
      return createdTagihan
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  async return(trx_id: number, via: string, channel: string, va: number, uniqamount: number, id: number) {
    let data = {
      trx_id: trx_id,
      via: via,
      channel: channel,
      va: va,
      uniqamount: uniqamount,
      status: 1
    }

    if (via == "va") {
      delete data["uniqamount"]
    } else {
      delete data["va"]
    }
    try {
      await this.tagihanModel.update(data, { where: { id: id } });
      return data
    } catch (error) {
      throw new Error(error);
    }
  }

  async approval(trx_id: number, sid: string, status: string, via: string, id: number) {
    console.log(" service approve", trx_id, sid, status, via, id)

    let data = {
      status: 1
    }
    if (status == "berhasil") {
      data.status = 2
    } else {
      data.status = 0
    }
    console.log("data approval", data)
    try {
      await this.tagihanModel.update(data, { where: { session_id: sid } });
      return data
    } catch (error) {
      throw new Error(error);
    }
  }

  async pending(trx_id: number, via: string, channel: string, va: number, uniqamount: number, sid: string) {
    let data = {
      trx_id: trx_id,
      via: via,
      channel: channel,
      va: va,
      uniqamount: uniqamount,
      status: 1
    }

    if (via == "va") {
      delete data["uniqamount"]
    } else {
      delete data["va"]
    }
    try {
      await this.tagihanModel.update(data, { where: { session_id: sid } });
      return data
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkApproval(sid: string) {
    return await this.tagihanModel.findOne({ include: [{ model: User, attributes: ['name', 'email'] }], where: { session_id: sid } });
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

  async uploadfbuktitransfer(file: CreateTagihanImage, id_tagihan: string) {

    const response = await this.tagihanModel.findAll({
      where: {
        id: id_tagihan
      }
    });

    const updatedTagihan = {
      user_id: response[0].user_id,
      stan_meter_awal: response[0].stan_meter_awal,
      stan_meter_akhir: response[0].stan_meter_akhir,
      penggunaan: response[0].penggunaan,
      tagihan_air: response[0].tagihan_air,
      sampah: response[0].sampah,
      keamanan: response[0].keamanan,
      admin: response[0].admin,
      sub_total_tagihan: response[0].sub_total_tagihan,
      denda: response[0].denda,
      grand_total: response[0].grand_total,
      date: response[0].date,
      status: 1,
      foto: process.env.PATH_IMAGE + new Date().valueOf() + file.originalname.replace(new RegExp(" ", "g"), "-"),
    }

    const data = {
      foto: process.env.PATH_IMAGE + new Date().valueOf() + file.originalname.replace(new RegExp(" ", "g"), "-"),
      status: 1
    }

    try {
      const execute = await this.tagihanModel.update(data, { where: { id: id_tagihan } });
      const imagePath = `images/buktiTransfer/${new Date().valueOf()}${file.originalname.replace(new RegExp(" ", "g"), "-")}`;
      fs.writeFile("./src/" + imagePath, file.buffer, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
      return updatedTagihan
    } catch (error) {
      console.log(error)
      return false
    }



  }

  findAll() {
    return this.tagihanModel.findAll({ include: [{ model: User, attributes: ['name', 'email'] }] })
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
