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
  HasMany,
  PrimaryKey,
} from 'sequelize-typescript';
import { Tagihan } from 'src/tagihan/tagihan.model';

@Table
export class User extends Model {
  // @ApiProperty()
  @AutoIncrement
  @PrimaryKey
  @Column
  // ({ type: DataType.BIGINT })
  id: number;

  // @ApiProperty()
  @Column
  // ({ type: DataType.STRING })
  name: string;

  // @ApiProperty()
  @Column
  // ({ type: DataType.STRING })
  email: string;

  // @ApiProperty()
  @Column
  // ({ type: DataType.BIGINT })
  username: string;

  // @ApiProperty()
  @Column
  // ({ type: DataType.BIGINT })
  password: string;

  // @ApiProperty()
  @Column
  // ({ type: DataType.BIGINT })
  role: string;

  @HasMany(() => Tagihan)
  tagihan: Tagihan[];

}
