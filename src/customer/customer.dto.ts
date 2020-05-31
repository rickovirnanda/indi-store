import { ApiProperty } from "@nestjs/swagger";

export class CustomerDTO{
    @ApiProperty()
    readonly id:number;

    @ApiProperty()
    readonly name:string;

    @ApiProperty()
    readonly phone:string;

    @ApiProperty()
    readonly email:string;

    @ApiProperty()
    readonly password:string;

    @ApiProperty()
    readonly shippingAddress:string;
}