import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoteDto } from './dtos/create-lote.dto';
import { UpdateLoteDto } from './dtos/update-lote.dto';

@Injectable()
export class LotesService {
    constructor(private prisma: PrismaService) {}

    findAll(campoId?: string) {
        return this.prisma.lote.findMany({
        where: campoId ? { campoId } : undefined,
        orderBy: [{ campoId: 'asc' }, { nroLote: 'asc' }],
        });
    }

    async findOne(id: string) {
        const lote = await this.prisma.lote.findUnique({ where: { id } });
        if (!lote) throw new NotFoundException('Lote no encontrado');
        return lote;
    }

    async create(dto: CreateLoteDto) {
        // Si querés, validación rápida de existencia de campo:
        const campo = await this.prisma.campo.findUnique({ where: { id: dto.campoId } });
        if (!campo) throw new BadRequestException('campoId inválido');

        return this.prisma.lote.create({ data: dto });
    }

    async update(id: string, dto: UpdateLoteDto) {
        await this.findOne(id);
        if (dto.campoId) {
        const campo = await this.prisma.campo.findUnique({ where: { id: dto.campoId } });
        if (!campo) throw new BadRequestException('campoId inválido');
        }
        return this.prisma.lote.update({ where: { id }, data: dto });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.lote.delete({ where: { id } });
    }
    }

