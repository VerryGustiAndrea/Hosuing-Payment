import { Module } from '@nestjs/common';
import { TagihanService } from './tagihan.service';
import { TagihanController } from './tagihan.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tagihan } from './tagihan.model';

@Module({
  imports: [SequelizeModule.forFeature([Tagihan])],
  controllers: [TagihanController],
  providers: [TagihanService]
})
export class TagihanModule { }
