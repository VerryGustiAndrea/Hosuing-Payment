import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UploadedFiles, } from '@nestjs/common';
import { TagihanService } from './tagihan.service';
import { CreateTagihanDto, CreateTagihanImage } from './dto/create-tagihan.dto';
import { UpdateTagihanDto } from './dto/update-tagihan.dto';
import { Response, ErrorResponse } from '../library';
import { DateOnlyDataType } from 'sequelize/types';

import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';



@Controller('tagihan')
export class TagihanController {
  constructor(private readonly tagihanService: TagihanService) { }

  //ADMIN
  @Get('getlisttagihan')
  async getlisttagihan(@Query('date') date: string) {
    const response = await this.tagihanService.GetListTagihan(date);
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
    console.log(createTagihanDto)
    try {
      const response = await this.tagihanService.inputtagihan(createTagihanDto);
      return Response(response, 'Success Input Tagihan', true);
    } catch (error) {
      return ErrorResponse(error, 500, null)
    }
  }

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
