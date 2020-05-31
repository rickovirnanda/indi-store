import { IsString } from 'class-validator';
import { ProductEntity } from 'src/product/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDTO{
    @ApiProperty()
    @IsString()
    name:string;
}

export class CategoryRO{
    id?:number;
    name?:string;
    isActive?:boolean;
    products?:ProductEntity[];
}