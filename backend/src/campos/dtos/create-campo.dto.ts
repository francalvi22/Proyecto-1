import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateCampoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  @Min(0)
  superficieTotalHa: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  superficieCultivableHa?: number;
}
