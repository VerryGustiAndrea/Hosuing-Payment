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

}
