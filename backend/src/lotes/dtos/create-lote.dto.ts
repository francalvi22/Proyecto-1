import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateLoteDto {
    @IsString()
    @IsNotEmpty()
    campoId: string;

    @IsString()
    @IsNotEmpty()
    nroLote: string;

    @IsNumber()
    @Min(0)
    areaHa: number;

    @IsOptional()
    @IsString()
    observaciones?: string;
}

