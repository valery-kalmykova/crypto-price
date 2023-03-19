import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
