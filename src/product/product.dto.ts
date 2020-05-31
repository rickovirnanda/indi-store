import { IsString, IsNumber } from 'class-validator';
import { CategoryEntity } from 'src/category/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO{
    @ApiProperty()
    @IsString()
    name:string;

    @ApiProperty()
    @IsString()
    createdDate:Date;

    @ApiProperty()
    @IsNumber()
    stock:number;
    
    @ApiProperty()
    @IsString()
    description:string;

    @ApiProperty()
    @IsNumber()
    price:number;

    @ApiProperty()
    @IsString()
    imageUrl:string; 

    @ApiProperty()
    @IsNumber()
    categoryId:number;
}

export class ProductRO{
    id?:string;

    name?:string;

    createdDate?:Date;

    stock?:number;
    
    description?:string;

    price?:number;

    imageUrl?:string; 

    category?:CategoryEntity;
}