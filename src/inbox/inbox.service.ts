import { Injectable, Param } from '@nestjs/common';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateInboxDto } from './dto/update-inbox.dto';

import { InjectModel } from '@nestjs/sequelize';
import { Inbox } from './inbox.model';
const { Op } = require("sequelize");

@Injectable()
export class InboxService {
  constructor(
    @InjectModel(Inbox)
    public inboxModel: typeof Inbox,
  ) { }

  getinboxuser(date: string, user_id: number) {
    const date1 = new Date(date) //date
    const date2 = new Date(new Date(date).setMonth(new Date(date).getMonth() + 1)) //date + 1 month
    return this.inboxModel.findAll({
      where: {
        [Op.and]: [{
          date: {
            [Op.between]: [date1, date2],
          }
        }, { user_id: user_id }]
      }
    });
  }

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
