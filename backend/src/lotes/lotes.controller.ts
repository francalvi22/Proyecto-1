import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { LotesService } from './lotes.service';
import { CreateLoteDto } from './dtos/create-lote.dto';
import { UpdateLoteDto } from './dtos/update-lote.dto';

@Controller('lotes')
export class LotesController {
    constructor(private readonly service: LotesService) {}

    @Get()
    findAll(@Query('campoId') campoId?: string) {
        return this.service.findAll(campoId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateLoteDto) {
        return this.service.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateLoteDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}

