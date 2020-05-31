import { Injectable, Logger } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerDTO } from 'src/customer/customer.dto';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { CustomerEntity } from 'src/customer/customer.entity';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly customerService:CustomerService){}

    async register(customer:CustomerDTO){
        let status:RegistrationStatus = {
            success:true,
            message:'customer register'
        };

        try{
            await this.customerService.register(customer);
        }
        catch(err)
        {
            status = {success:false, message:err};
        }

        return status;
    }    

    createToken(customer:CustomerEntity)
    {
        const expiresIn = 3600;
        const accessToken = jwt.sign(
            {
                id:customer.id,
                name:customer.name,
                email:customer.email,
                phone:customer.phone,
                shippingAddress:customer.shippingAddress
            },
            'IndikInLove',
            {expiresIn}
        );
    
        return {
            expiresIn,
            accessToken,
        };
    }

    async validateCustomerToken(payload:JwtPayload):Promise<CustomerEntity>
    {
        return await this.customerService.findById(payload.id);
    }

    async validateCustomer(email:string, password:string)
    {
        const customer = await this.customerService.findByEmail(email);

        if(customer && customer.comparePassword(password))
        {
            this.logger.log('password check success');
            const {password, ...result} = customer;

            return result;
        }

        return null;
    }
}
