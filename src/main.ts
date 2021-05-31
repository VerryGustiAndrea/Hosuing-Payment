import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


//ssl path
const https = require("https");
const fs = require("fs");
var key = fs.readFileSync("ssl/private.key");
var cert = fs.readFileSync("ssl/certificate.crt");
var ca = fs.readFileSync("ssl/ca_bundle.crt");

var httpsOptions = {
  key: key,
  cert: cert,
  ca: ca,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalPipes(new ValidationPipe());
  // app.useStaticAssets(path.join(__dirname, '/../public'));
  // app.use(express.static(join(process.cwd(), '../client/dist/')));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
