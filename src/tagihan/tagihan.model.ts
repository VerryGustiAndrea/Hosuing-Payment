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
  HasOne,

} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table
export class Tagihan extends Model {
  // @ApiProperty()
  @AutoIncrement
  @PrimaryKey
  @Column
    ({ type: DataType.BIGINT })
  id: number;

  @Column
  session_id: string;

  // @ApiProperty()
  @Column
  // ({ type: DataType.BIGINT })
  url: string;

  @Column
  trx_id: number;

  // @ApiProperty()
  @Column
  via: number;

  @Column
  // ({ type: DataType.BIGINT })
  channel: string;

  // @ApiProperty()
  @Column
  va: number;

  // @ApiProperty()
  @Column
  uniqamount: number;

  // @ApiProperty()
  @Column
  @ForeignKey(() => User)
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  // @ApiProperty()
  @Column
    ({ type: DataType.BIGINT })
  stan_meter_awal: number;

  // @ApiProperty()
  @Column
    ({ type: DataType.BIGINT })
  stan_meter_akhir: number;

  // @ApiProperty()
  @Column
    ({ type: DataType.BIGINT })
  penggunaan: number;

  // @ApiProperty()
  @Column
    ({ type: DataType.BIGINT })
  tagihan_air: number;

  // @ApiProperty()
  @Column
    ({ type: DataType.BIGINT })
  sampah: number;

  // @ApiProperty()
  @Column
    ({ type: DataType.BIGINT })
  keamanan: number;

  // @ApiProperty()
  @Column
    ({ type: DataType.BIGINT })
  admin: number;

  // @ApiProperty()
  @Column
    ({ type: DataType.BIGINT })
  sub_total_tagihan: number;

  // @ApiProperty()
  @Column
    ({ type: DataType.BIGINT })
  denda: number;

  // @ApiProperty()
  @Column
    ({ type: DataType.BIGINT })
  grand_total: number;

  // @ApiProperty()
  @Column({ type: DataType.DATE })
  // ({ type: DataType.BIGINT })
  date: Date;

  // @ApiProperty()
  @Column
  // ({ type: DataType.BIGINT })
  status: number;

  // @ApiProperty()
  @Column
  // ({ type: DataType.BIGINT })
  foto: string;



  // @HasMany(() => User)
  // user: User[];
}
