import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagihanService } from './tagihan.service';
import { CreateTagihanDto } from './dto/create-tagihan.dto';
import { UpdateTagihanDto } from './dto/update-tagihan.dto';

@Controller('tagihan')
export class TagihanController {
  constructor(private readonly tagihanService: TagihanService) { }


  @Get()
  findAll() {
    return this.tagihanService.findAll();
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
