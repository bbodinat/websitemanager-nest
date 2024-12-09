import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePageDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    siteId: number;
}