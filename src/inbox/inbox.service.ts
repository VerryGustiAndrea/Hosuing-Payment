import { Injectable, Param } from '@nestjs/common';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateInboxDto } from './dto/update-inbox.dto';

import { InjectModel } from '@nestjs/sequelize';
import { Inbox } from './inbox.model';

@Injectable()
export class InboxService {
  constructor(
    @InjectModel(Inbox)
    private inboxModel: typeof Inbox,
  ) { }

  findAll() {
    return `This action returns all inbox`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inbox`;
  }

  create(createInboxDto: CreateInboxDto) {
    return 'This action adds a new inbox';
  }

  update(id: number, updateInboxDto: UpdateInboxDto) {
    return `This action updates a #${id} inbox`;
  }

  remove(id: number) {
    return `This action removes a #${id} inbox`;
  }
}
