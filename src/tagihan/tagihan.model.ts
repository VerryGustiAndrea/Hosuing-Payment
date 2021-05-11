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
export class Tagihan extends Model {
  // @ApiProperty()
  @AutoIncrement
  @PrimaryKey
  @Column
    ({ type: DataType.BIGINT })
  id: number;

  // @ApiProperty()
  @Column
  // ({ type: DataType.BIGINT })
  channel: string;

  // @ApiProperty()
  @Column
  transaction_id: number;

  // @ApiProperty()
  @Column
  user_id: number;

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
}
