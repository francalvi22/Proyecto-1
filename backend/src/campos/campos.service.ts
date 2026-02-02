import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CamposService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.campo.findMany({
      orderBy: { nombre: 'asc' },
    });
  }
}
