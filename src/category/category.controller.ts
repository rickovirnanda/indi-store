import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService){
        
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    showAllCategory(){
        return this.categoryService.showAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiBody({type:[CategoryDTO]})
    createCategory(@Body() data:CategoryDTO){
        return this.categoryService.create(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    readCategory(@Param('id') id:number){
        return this.categoryService.read(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @ApiBody({type:[CategoryDTO]})
    updateCategory(@Param('id') id:number, @Body() data:Partial<CategoryDTO>){
        return this.categoryService.update(id, data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    destroyCategory(@Param('id') id:number){
        return this.categoryService.destroy(id);
    }
}
