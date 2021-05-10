import { Injectable, Param } from '@nestjs/common';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateInboxDto } from './dto/update-inbox.dto';

import { InjectModel } from '@nestjs/sequelize';
import { Inbox } from './inbox.model';

@Injectable()
export class InboxService {
  constructor(
    @InjectModel(Inbox)
    public inboxModel: typeof Inbox,
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

  async inputinbox(createInboxDto: CreateInboxDto) {
    const createdInbox = new this.inboxModel({
      user_id: createInboxDto.user_id,
      title: createInboxDto.title,
      message: createInboxDto.message,
      date: new Date()
    })
    try {
      await createdInbox.save()
      return createdInbox
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updateInboxDto: UpdateInboxDto) {
    return `This action updates a #${id} inbox`;
  }

  remove(id: number) {
    return `This action removes a #${id} inbox`;
  }
}
