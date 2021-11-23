export interface IUser{
    id: number;
    name: string;
    age: number;
    creditCard?: string;
    cvv?: string;
    token?: string;
    email?:string;
    password?:string;
}