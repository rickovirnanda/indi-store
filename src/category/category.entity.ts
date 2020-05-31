import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { CategoryRO } from './category.dto';

@Entity('category')
export class CategoryEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @Column({ default: 0 })
    isDeleted:number;

    @OneToMany(type=>ProductEntity, product=>product.category)
    products:ProductEntity[];

    toResponseObject():CategoryRO
    {
        const { id, name} = this;

        const response:CategoryRO = {
            id,
            name
        };

        if(this.products)
            response.products = this.products;
        
        return response;
    }
}