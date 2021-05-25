import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UploadedFiles, } from '@nestjs/common';
import { TagihanService } from './tagihan.service';
import { InboxService } from '../inbox/inbox.service';
import { CreateTagihanDto, CreateTagihanImage } from './dto/create-tagihan.dto';
import { UpdateTagihanDto } from './dto/update-tagihan.dto';
import { ApprovalTagihanDto } from './dto/approval-tagihan.dto';
import { CheckoutTagihanDto } from './dto/checkout-tagihan.dto';
import { Response, ErrorResponse, ErrorResponseCustom } from '../library';
import { DateOnlyDataType } from 'sequelize/types';

import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import response from 'src/library/response';

import { MailService } from './../mail/mail.service';


@Controller('tagihan')
export class TagihanController {
  constructor(private readonly tagihanService: TagihanService,
    private inboxService: InboxService,
    private mailService: MailService
  ) { }

  //ADMIN
  @Get('alltagihan')
  async allTagihan() {
    try {
      const response = await this.tagihanService.findAll();
      return Response(response, 'Success Send Mail', true);
    } catch (error) {
      return ErrorResponse(error, 500, null)
    }
  }

  @Post('sendMail')
  async sendMail(@Query('email') email: string, @Query('title') title: string, @Query('message') message: string, @Query('name') name: string) {
    try {
      const response = await this.mailService.sendTagihanInfo(email, title, message, name);
      return Response(response, 'Success Send Mail', true);
    } catch (error) {
      return ErrorResponse(error, 500, null)
    }
  }

  @Get('getlisttagihan')
  async getlisttagihan(@Query('date') date: string) {
    const response = await this.tagihanService.GetListTagihan(date);
    // console.log(response)
    if (response.length) {
      if (response.length == 1) {
        return Response(response[0], 'Data ditemukan', true);
      } else {
        return Response(response, 'Data ditemukan', true);
      }
    } else {
      return Response(response, 'Data tidak ditemukan', false);
    }
  }

  @Get('getlisthistory')
  async getlisthistory(@Query('date') date: string,) {
    const response = await this.tagihanService.getlisthistory(date);
    if (response.length) {
      if (response.length == 1) {
        return Response(response[0], 'Data ditemukan', true);
      } else {
        return Response(response, 'Data ditemukan', true);
      }
    } else {
      return Response(response, 'Data tidak ditemukan', false);
    }
  }

  @Post('inputtagihan')
  async inputtagihan(@Body() createTagihanDto: CreateTagihanDto) {
    try {
      const response = await this.tagihanService.inputtagihan(createTagihanDto);
      return Response(response, 'Success Input Tagihan', true);
    } catch (error) {
      return ErrorResponse(error, 500, null)
    }
  }

  @Get('return/:id')
  async return(@Query('trx_id') trx_id: number, @Query('via') via: string, @Query('channel') channel: string, @Query('va') va: number, @Query('uniqamount') uniqamount: number, @Param('id') id: number) {
    try {
      const response = await this.tagihanService.return(trx_id, via, channel, va, uniqamount, id);
      return Response(response, 'Success Input Tagihan', true);
    } catch (error) {
      return ErrorResponse(error, 500, null)
    }
  }

  @Post('approval/:id')
  async approval(@Body() approvalTagihanDto: ApprovalTagihanDto, @Param('id') id: number) {
    try {
      console.log("body", approvalTagihanDto)
      console.log(" controller approve", approvalTagihanDto.trx_id, approvalTagihanDto.sid, approvalTagihanDto.status, approvalTagihanDto.via, id)
      const response = await this.tagihanService.approval(approvalTagihanDto.trx_id, approvalTagihanDto.sid, approvalTagihanDto.status, approvalTagihanDto.via, id);
      const responseCheck = await this.tagihanService.checkApproval(approvalTagihanDto.sid);

      //add inbox
      const dataInbox = {
        user_id: Number(id),
        title: "Informasi pembayaran Tagihan bulan " + `${new Date(responseCheck.date).getMonth() + 1} Tahun ` + `${new Date(responseCheck.date).getFullYear()}`,
        message: "",
        date: responseCheck.date
      }

      if (approvalTagihanDto.status == "berhasil") {
        console.log("berhasil")
        dataInbox.message = `Pembayaran tagihan anda  bulan ${new Date(responseCheck.date).getMonth() + 1} Tahun ` + `${new Date(responseCheck.date).getFullYear()} berhasil di terima. Terimkasih atas pembayaran anda.`
        await this.inboxService.inputinbox(dataInbox);
        //send email
        await this.mailService.sendTagihanInfo(responseCheck.user.email, dataInbox.title, dataInbox.message, responseCheck.user.name);
        return Response(dataInbox, 'Success Input Inbox', true);
      } else if (approvalTagihanDto.status == "gagal") {
        console.log("gagal")
        dataInbox.message = `Pembayaran tagihan anda bulan ${new Date(responseCheck.date).getMonth() + 1} Tahun ` + `${new Date(responseCheck.date).getFullYear()} ditolak, mohon konfirmasi kembali kepada admin. Terimakasih.`
        await this.inboxService.inputinbox(dataInbox);
        return Response(dataInbox, 'Success Input Inbox', true);
      } else if (approvalTagihanDto.status == "pending") {
        console.log("pending")
        await this.tagihanService.pending(approvalTagihanDto.trx_id, approvalTagihanDto.via, approvalTagihanDto.channel, approvalTagihanDto.va, approvalTagihanDto.uniqamount, approvalTagihanDto.sid);
        dataInbox.message = `Pembayaran tagihan anda bulan ${new Date(responseCheck.date).getMonth() + 1} Tahun ` + `${new Date(responseCheck.date).getFullYear()} sedang diproses, mohon menunggu info selanjutnya. Terimakasih.`
        //send email
        await this.mailService.sendTagihanInfo(responseCheck.user.email, dataInbox.title, dataInbox.message, responseCheck.user.name);
        return Response(approvalTagihanDto, 'Transaction pending', true);
      }

    } catch (error) {
      console.log(error)
      return ErrorResponse(error, 500, null)
    }
  }

  // @Post('approval')
  // async approval(@Body() approvalTagihanDto: ApprovalTagihanDto) {

  //   try {
  //     let response = await this.tagihanService.approval(approvalTagihanDto);
  //     if (response.status == 1) {
  //       //respon error gagal update
  //       return ErrorResponseCustom("Status gagal di update", false, null)
  //     } else if (response.status == 0 || response.status == 2) {
  //       const dataInbox = {
  //         user_id: approvalTagihanDto.user_id,
  //         title: response.message,
  //         message: "",
  //         date: ""
  //       }
  //       if (response.status == 2) {
  //         dataInbox.message = `Pembayaran anda pada ${new Date().toDateString()} berhasil di terima. Terimkasih atas pembayaran anda.`
  //       } else if (response.status == 0) {
  //         dataInbox.message = `Pembayaran anda pada ${new Date().toDateString()} ditolak, dikarenakan bukti transfer tidak sesuai atau tidak valid, mohon upload dan konfirmasi kembali kepada admin. Terimakasih.`
  //       }
  //       //add notification
  //       await this.inboxService.inputinbox(dataInbox);
  //       //respon success update
  //       return Response(null, "Status berhasil di update", true);
  //     } else {
  //       //respon error gagal update
  //       return { status: 1, message: "Status gagal di update" }
  //     }
  //   } catch (error) {
  //     return ErrorResponseCustom("Status gagal di update", false, null)
  //   }
  // }

  //WARGA
  @Get('gettagihanwarga')
  async gettagihan(@Query('date') date: string, @Query('user_id') user_id: number) {
    const response = await this.tagihanService.GetTagihanWarga(date, user_id);
    if (response.length) {
      if (response.length == 1) {
        return Response(response[0], 'Data ditemukan', true);
      } else {
        return Response(response, 'Data ditemukan', true);
      }
    } else {
      return Response(response, 'Data tidak ditemukan', false);
    }
  }

  @Get('gethistorywarga')
  async gethistorywarga(@Query('date') date: string, @Query('user_id') user_id: number) {
    const response = await this.tagihanService.gethistorywarga(date, user_id);
    if (response.length) {
      if (response.length == 1) {
        return Response(response[0], 'Data ditemukan', true);
      } else {
        return Response(response, 'Data ditemukan', true);
      }
    } else {
      return Response(response, 'Data tidak ditemukan', false);
    }
  }

  @Post('uploadfbuktitransfer/:id_tagihan')
  @UseInterceptors(FileInterceptor('foto'))
  async uploadfbuktitransfer(
    @UploadedFile() file: CreateTagihanImage,
    @Param('id_tagihan') id_tagihan: string
  ) {
    if (!file) {
      return ErrorResponse('Error Image not found', 500, null);
    }
    const response = await this.tagihanService.uploadfbuktitransfer(file, id_tagihan);
    if (response === false) {
      return ErrorResponse('Error Insert Data', 500, null);
    } else {
      return Response(response, 'Success input bukti transfer', true);
    }
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagihanService.findOne(+id);
  }

  @Post()
  create(@Body() createTagihanDto: CreateTagihanDto) {
    return this.tagihanService.create(createTagihanDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagihanDto: UpdateTagihanDto) {
    return this.tagihanService.update(+id, updateTagihanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagihanService.remove(+id);
  }
}
