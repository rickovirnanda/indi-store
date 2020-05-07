import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository:Repository<ProductEntity>)
    {
        
    }

    async showAll(){
        return await this.productRepository.find();
    }

    async create(data:Product){
        const product = await this.productRepository.create(data);
        await this.productRepository.save(product);
        return product;
    }

    async read(id:number){
        return await this.productRepository.findOne({ where: { id } })
    }

    async update(id:number, data:Partial<Product>)
    {
        await this.productRepository.update(id, data);
        return await this.productRepository.findOne(id);
    }
    
    async destroy(id:number)
    {
        await this.productRepository.delete(id);
        return {delete:true};
    }
}
