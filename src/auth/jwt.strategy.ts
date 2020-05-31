import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService
    )
    {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: 'IndikInLove'
        })
    }

    async validate(payload:any, done:Function)
    {
        const customer = await this.authService.validateCustomerToken(payload);

        if(!customer)
        {
            return done(new UnauthorizedException(), false);
        }

        done(null, customer);
    }
}