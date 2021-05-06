import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { InboxController } from './inbox.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Inbox } from './inbox.model';

@Module({
  imports: [SequelizeModule.forFeature([Inbox])],
  controllers: [InboxController],
  providers: [InboxService]
})
export class InboxModule { }
