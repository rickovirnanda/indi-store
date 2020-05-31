import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService){
        super({
            usernameField:'email',
            passportField:'password'
        })
    }

    private readonly logger = new Logger(AuthService.name);

    async validate(username:string, password:string):Promise<any>
    {
        const customer = await this.authService.validateCustomer(username,password);
        this.logger.log(customer);

        if(!customer)
        {
            throw new UnauthorizedException();
        }

        return customer;
    }
}