import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO, ProductRO } from './product.dto';
import { CategoryService } from 'src/category/category.service';
import { reduceObject, clearResult } from './../shared/helper';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository:Repository<ProductEntity>,
        private readonly categoryService:CategoryService
        )
    {}

    async showAll():Promise<ProductDTO[]>
    {
        const entity:ProductEntity[] = await this.productRepository.find({relations: ['category'] });

        const resDTO:ProductDTO[] = entity.map(x=>{
                                        const res = this.productToDTO(x);
                                        return <ProductDTO>reduceObject(res,['isDeleted', 'category'])
                                    });

        return resDTO;
    }

    private productToObject(product:ProductEntity) : ProductRO
    {
        const responseObject:any = {
            ...product,
            category:product.category ? product.category.toResponseObject() : null
        }

        return responseObject;
    }

    private productToDTO(product:ProductEntity):ProductDTO
    {
        const responseObject:ProductDTO = {
            ...product,
            categoryId:product.category ? product.category.id : null
        }

        return responseObject;
    }

    async create(data:ProductDTO): Promise<ProductRO>
    {
        const category = await this.categoryService.findById(data.categoryId);

        const product = await this.productRepository.create({...data, category:category});

        await this.productRepository.save(product);

        return null;
    }

    async read(id:number):Promise<ProductDTO>
    {
        const product = await this.productRepository.findOne({ 
            where: { id:id },
            relations : ['category']
        })
        
        if(!product)
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        
        return <ProductDTO>clearResult(this.productToDTO(product));
    }

    async update(id:number, data:Partial<ProductDTO>)
    {
        const product = await this.productRepository.findOne({
            where:{id:id},
            relations : ['category']
        });

        if(!product) 
            throw new HttpException('Not found',HttpStatus.NOT_FOUND);
        
        await this.productRepository.update({ id:id }, data);

        return null;
    }
    
    async destroy(id:number)
    {
        const product =  await this.productRepository.findOne({ where : { id:id }});
        if(!product) 
            throw new HttpException('Not found',HttpStatus.NOT_FOUND);

        await this.productRepository.delete(id);
        return {delete:true};
    }
}
