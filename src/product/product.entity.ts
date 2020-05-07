import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from 'src/category/category.entity';

@Entity('product')
export class ProductEntity{
    @PrimaryGeneratedColumn() 
    id:string;

    @Column() 
    name:string;

    @CreateDateColumn()
    created:Date;

    @Column()
    stock:number;

    @Column("text")
    description:string;

    @Column()
    price:number;

    @Column()
    imageUrl:string;
    
    @Column({ default: true })
    isActive:boolean;

    @ManyToOne(type=>CategoryEntity, category=>category.products)
    category:CategoryEntity[];
}