import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){

    }
    @Get()
    showAllProduct(){
        return this.productService.showAll();
    }

    @Post()
    createProduct(@Body() data:Product){
        return this.productService.create(data);
    }

    @Get(':id')
    readProduct(@Param('id') id:number){
        return this.productService.read(id);
    }

    @Put(':id')
    updateProduct(@Param() id:number, @Body() data:Partial<Product>){
        return this.productService.update(id, data);
    }

    @Delete(':id')
    destroyProduct(@Param() id:number){
        return this.productService.destroy(id);
    }
}
