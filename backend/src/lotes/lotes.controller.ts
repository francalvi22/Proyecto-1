import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { LotesService } from './lotes.service';

@Controller('lotes')
export class LotesController {
    constructor(private readonly service: LotesService) {}

    @Get()
    getLotes(@Query('campoId') campoId?: string) {
        if (!campoId) {
        throw new BadRequestException('campoId es requerido');
        }
        return this.service.findByCampo(campoId);
    }
}
