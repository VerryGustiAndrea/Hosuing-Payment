// import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  Table,
  AutoIncrement,
  DataType,
  AllowNull,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';

@Table
export class Inbox extends Model {
  // @ApiProperty()
  @AutoIncrement
  @PrimaryKey
  @Column
  // ({ type: DataType.BIGINT })
  id: number;

  // @ApiProperty()
  @Column
  // ({ type: DataType.STRING })
  user_id: number;

  // @ApiProperty()
  @Column
  // ({ type: DataType.BIGINT })
  title: string;

  // @ApiProperty()
  @Column
  // ({ type: DataType.BIGINT })
  message: string;

  // @ApiProperty()
  @Column({ type: DataType.DATE })
  // ({ type: DataType.BIGINT })
  date: Date;
}
