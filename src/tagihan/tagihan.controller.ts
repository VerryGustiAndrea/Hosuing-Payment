import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TagihanService } from './tagihan.service';
import { CreateTagihanDto } from './dto/create-tagihan.dto';
import { UpdateTagihanDto } from './dto/update-tagihan.dto';
import { Response, ErrorResponse } from '../library';
import { DateOnlyDataType } from 'sequelize/types';

@Controller('tagihan')
export class TagihanController {
  constructor(private readonly tagihanService: TagihanService) { }


  @Get()
  findAll() {
    return this.tagihanService.findAll();
  }

  @Get('getlisttagihan')
  async getlisttagihan(@Query('date') date: string) {
    // const month = Number(date.slice(5 - 7))
    // console.log(new Date(date))
    // console.log(Number(date.slice(5 - 7)))
    // console.log(new Date(date).getFullYear())
    // console.log(new Date(date).getMonth())
    // console.log(new Date(date).getDay())
    const response = await this.tagihanService.GetListTagihan(date);
    if (response.length) {
      return Response(response, 'Data ditemukan', true);
    } else {
      return Response(response, 'Data tidak ditemukan', false);
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
