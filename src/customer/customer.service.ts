import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerDTO } from './customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepository:Repository<CustomerEntity>
    ){}

    public async findAll():Promise<CustomerEntity[]>
    {
        return await this.customerRepository.find();
    }

    public async findByEmail(emailQuery:string):Promise<CustomerEntity | null>
    {
        return await this.customerRepository.findOne({email:emailQuery});
    }

    public async findById(id: number): Promise<CustomerEntity | null> {
        return await this.customerRepository.findOneOrFail(id);
    }

    public async create(customer:CustomerDTO):Promise<CustomerEntity>
    {
        return await this.customerRepository.save(customer);
    }

    public async update(id:number, newValue:CustomerDTO):Promise<CustomerEntity | null>
    {
        const customer = await this.customerRepository.findOneOrFail(id);

        if(!customer){
            console.error('customer doesnt exist');
        }
        await this.customerRepository.update(id, newValue);
        return await this.customerRepository.findOne(id);
    }

    public async register(customerDto:CustomerDTO):Promise<CustomerEntity>
    {
        const {email} = customerDto;
        let customer = await this.customerRepository.findOne({ where:{ email } });
        if(customer)
        {
            throw new HttpException('customer already exist', HttpStatus.BAD_REQUEST);
        }
        customer = await this.customerRepository.create(customerDto);
        return await this.customerRepository.save(customer);
    }
}
