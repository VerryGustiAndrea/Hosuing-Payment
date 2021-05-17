import { Module, forwardRef, HttpModule } from '@nestjs/common';
import { TagihanService } from './tagihan.service';
import { TagihanController } from './tagihan.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tagihan } from './tagihan.model';
import { InboxModule } from '../inbox/inbox.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [SequelizeModule.forFeature([Tagihan]), HttpModule, MailModule, forwardRef(() => InboxModule)],
  controllers: [TagihanController],
  providers: [TagihanService]
})
export class TagihanModule { }
