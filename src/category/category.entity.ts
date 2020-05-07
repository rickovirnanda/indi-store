import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';

@Entity('category')
export class CategoryEntity{
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    name:string;
    
    @Column({ default: true })
    isActive:boolean;

    @OneToMany(type=>ProductEntity, product=>product.category)
    products:ProductEntity[];
}