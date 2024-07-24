export interface Ticket{
    Title :string;
    description :string;
    activation:Date;
    expiration :Date;
    photo:string;
    price:number;
    ticketCount:number;
    genre:string;
    publisherID:number;
}