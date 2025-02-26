import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsArray, IsOptional } from "class-validator";

@Schema({ timestamps: true })

export class Book {
    @Prop()
    @IsOptional()
    title: string

    @Prop()
    @IsOptional()
    author: string

    @Prop()
    @IsOptional()
    description: string


    @Prop()
    @IsOptional()
    price: string


    @Prop()
    @IsOptional()
    quantity: string


    @Prop()
    @IsOptional()
    sold: string


    @Prop({ required: false })
    @IsArray()
    images: string[]
}

export const bookSchema = SchemaFactory.createForClass(Book)