import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CamposService } from './campos.service';
import { CreateCampoDto } from './dtos/create-campo.dto';
import { UpdateCampoDto } from './dtos/update-campo.dto';

@Controller('campos')
export class CamposController {
    constructor(private readonly service: CamposService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateCampoDto) {
        return this.service.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCampoDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }

    @Get(':id/lotes')
    lotes(@Param('id') id: string) {
        return this.service.lotes(id);
    }
}

