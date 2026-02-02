import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampoDto } from './dtos/create-campo.dto';
import { UpdateCampoDto } from './dtos/update-campo.dto';

@Injectable()
export class CamposService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.campo.findMany({ orderBy: { nombre: 'asc' } });
  }

  async findOne(id: string) {
    const campo = await this.prisma.campo.findUnique({ where: { id } });
    if (!campo) throw new NotFoundException('Campo no encontrado');
    return campo;
  }

  create(dto: CreateCampoDto) {
    return this.prisma.campo.create({ data: dto });
  }

  async update(id: string, dto: UpdateCampoDto) {
    await this.findOne(id);
    return this.prisma.campo.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.campo.delete({ where: { id } });
  }

  lotes(id: string) {
    return this.prisma.lote.findMany({
      where: { campoId: id },
      orderBy: [{ nroLote: 'asc' }],
    });
  }
}

