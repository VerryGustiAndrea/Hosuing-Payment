import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateInboxDto } from './dto/update-inbox.dto';
import { Response, ErrorResponse, ErrorResponseCustom } from '../library';

@Controller('inbox')
export class InboxController {
  constructor(private readonly inboxService: InboxService) { }

  @Get('getinboxwarga')
  async getInboxUser(@Query('date') date: string, @Query('user_id') user_id: number) {
    const response = await this.inboxService.getinboxuser(date, user_id);
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inboxService.findOne(+id);
  }

  @Post()
  create(@Body() createInboxDto: CreateInboxDto) {
    return this.inboxService.create(createInboxDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInboxDto: UpdateInboxDto) {
    return this.inboxService.update(+id, updateInboxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inboxService.remove(+id);
  }
}
