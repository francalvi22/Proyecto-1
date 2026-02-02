import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LotesService {
    constructor(private prisma: PrismaService) {}

    findByCampo(campoId: string) {
        return this.prisma.lote.findMany({
        where: { campoId },
        orderBy: { nroLote: 'asc' },
        });
    }
}
