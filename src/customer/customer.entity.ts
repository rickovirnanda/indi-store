import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CustomerRO } from "./customer.ro";

@Entity('customer')
export class CustomerEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    phone:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    shippingAddress:string;

    @CreateDateColumn()
    createdDate:Date;

    @Column({ default: 0 })
    isDeleted:number;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,10);
    }

    async comparePassword(attempt:string):Promise<boolean>
    {
        return await bcrypt.compare(attempt, this.password);
    }

    toResponseObject(showToken:boolean = true):CustomerRO
    {
        const {id, name, phone, email,shippingAddress} = this;
        const response:CustomerRO = {id, name, phone, email,shippingAddress};

        return response;
    }
}