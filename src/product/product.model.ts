export class Product{
    id:string;
    name:string;
    created:Date;
    stock:number;
    description:string;
    price:number;
    imageUrl:string; 
    isActive:boolean;

    constructor()
    {
        this.id = "";
        this.name = "";
        this.created = new Date();
        this.stock = 0;
        this.description = "";
        this.price = 0;
        this.imageUrl = ""; 
        this.isActive = false;
    }
}

