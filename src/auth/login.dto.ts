import { ApiProperty } from "@nestjs/swagger";

export class LoginCustomerDTO{
    @ApiProperty()
    readonly email:string;

    @ApiProperty()
    readonly password:string;
}