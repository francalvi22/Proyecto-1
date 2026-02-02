import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CamposModule } from './campos/campos.module';
import { LotesModule } from './lotes/lotes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CamposModule,
    LotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


