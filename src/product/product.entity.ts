import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from 'src/category/category.entity';

@Entity('product')
export class ProductEntity{
    @PrimaryGeneratedColumn() 
    id:number;

    @Column() 
    name:string;

    @CreateDateColumn()
    createdDate:Date;

    @Column()
    stock:number;

    @Column("text")
    description:string;

    @Column()
    price:number;

    @Column()
    imageUrl:string;
    
    @Column({ default: 0 })
    isDeleted:number;

    @ManyToOne(type=>CategoryEntity, category=>category.products)
    category:CategoryEntity;
}