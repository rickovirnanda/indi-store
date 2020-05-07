import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';
import { Category } from './category.model';

@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService){
        
    }

    @Get()
    showAllCategory(){
        return this.categoryService.showAll();
    }

    @Post()
    createCategory(@Body() data:Category){
        return this.categoryService.create(data);
    }

    @Get(':id')
    readCategory(@Param() id:number){
        return this.categoryService.read(id);
    }

    @Put(':id')
    updateCategory(@Param() id:number, @Body() data:Partial<Category>){
        return this.categoryService.update(id, data);
    }

    @Delete(':id')
    destroyCategory(@Param() id:number){
        return this.categoryService.destroy(id);
    }
}
