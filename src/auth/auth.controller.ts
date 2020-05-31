import { Controller, Post, Response, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerDTO } from 'src/customer/customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginCustomerDTO } from './login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService,
        private readonly customerService:CustomerService
    ){

    }

    @Post('register')
    public async register(@Response() res, @Body() customerDTO:CustomerDTO)
    {
        const result = await this.authService.register(customerDTO);

        if(!result)
        {
            return res.status(HttpStatus.BAD_REQUEST).json(result);
        }

        return res.status(HttpStatus.OK).json(result);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Response() res, @Body() login:LoginCustomerDTO){
        const customer = await this.customerService.findByEmail(login.email);

        if(!customer)
        {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message:'Customer Not Found'
            });
        }
        else
        {
            const token = this.authService.createToken(customer);
            return res.status(HttpStatus.OK).json(token);
        }
    }
}
