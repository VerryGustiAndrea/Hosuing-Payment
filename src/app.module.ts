import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { InboxModule } from './inbox/inbox.module';
import { TagihanModule } from './tagihan/tagihan.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
  }),
  SequelizeModule.forRoot({
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadModels: true,
    synchronize: true,
  }), UserModule, InboxModule, TagihanModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
