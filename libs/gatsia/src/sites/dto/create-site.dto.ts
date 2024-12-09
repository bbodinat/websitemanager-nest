import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSiteDto {
    @IsString()
    name: string;

    @IsUrl()
    url: string;

    @IsNotEmpty()
    description: string;
}
