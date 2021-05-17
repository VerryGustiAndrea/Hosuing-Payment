import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { InboxModule } from './inbox/inbox.module';
import { TagihanModule } from './tagihan/tagihan.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      //   {
      //   rootPath: join(__dirname , '..', './src/images/buktiTransfer/'),   // <-- path to the static files
      // },
      { rootPath: './src/images/buktiTransfer/', serveRoot: '/public' }

    ),
    ConfigModule.forRoot({
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
    }), UserModule, InboxModule, TagihanModule, MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
