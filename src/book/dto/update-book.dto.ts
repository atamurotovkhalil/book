import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    readonly title: string

    @IsOptional()
    @IsString()
    readonly author: string

    @IsOptional()
    @IsString()
    readonly description: string

    @IsOptional()
    @IsString()
    readonly price: string

    @IsOptional()
    @IsString()
    readonly sold: string

    @IsOptional()
    @IsString()
    readonly quantity: string

    @IsOptional()
    @IsArray()
    readonly images: string[]
}