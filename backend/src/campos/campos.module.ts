import { Module } from '@nestjs/common';
import { CamposController } from './campos.controller';
import { CamposService } from './campos.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [CamposController],
    providers: [CamposService],
})
export class CamposModule {}
