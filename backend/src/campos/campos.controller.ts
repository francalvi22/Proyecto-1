import { Controller, Get } from '@nestjs/common';
import { CamposService } from './campos.service';

@Controller('campos')
export class CamposController {
  constructor(private readonly service: CamposService) {}

  @Get()
  getCampos() {
    return this.service.findAll();
  }
}
