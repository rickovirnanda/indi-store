import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from './category.dto';
import { reduceObject, clearResult } from './../shared/helper';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository:Repository<CategoryEntity>)
    {
        
    }

    async showAll():Promise<CategoryDTO[]>
    {
        const category:CategoryEntity[] =  await this.categoryRepository.find();

        const res:CategoryDTO[] = category.map(x=><CategoryDTO>clearResult(x));

        return res;
    }

    async create(data:CategoryDTO){
        const category = await this.categoryRepository.create(data);
        await this.categoryRepository.save(category);
        return null;
    }

    async read(id:number) : Promise<CategoryDTO>
    {
        const res = <CategoryDTO>clearResult(this.findById(id));
        return res;
    }

    public async findById(id:number):Promise<CategoryEntity>
    {
        const category = await this.categoryRepository.findOne({ where: { id:id } });
        if(!category)
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);

        return category;
    }

    async update(id:number, data:Partial<CategoryDTO>)
    {
        await this.categoryRepository.update({ id:id }, data);
        return null;
    }
    
    async destroy(id:number)
    {
        await this.categoryRepository.delete({ id:id });
        return {delete:true};
    }
}
