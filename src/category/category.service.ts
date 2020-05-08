import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from './category.dto';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository:Repository<CategoryEntity>)
    {
        
    }

    async showAll(){
        return await this.categoryRepository.find();
    }

    async create(data:Category){
        const category = await this.categoryRepository.create(data);
        await this.categoryRepository.save(category);
        return category;
    }

    async read(id:number){
        return await this.categoryRepository.findOne({ where: { id:`${id}` } })
    }

    async update(id:number, data:Partial<Category>)
    {
        await this.categoryRepository.update(id, data);
        return await this.categoryRepository.findOne(id);
    }
    
    async destroy(id:number)
    {
        await this.categoryRepository.delete(id);
        return {delete:true};
    }
}
