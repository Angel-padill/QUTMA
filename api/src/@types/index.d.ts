interface IUser {
    _id:string;
    name:string;
    email:string;
    lastname:string;
    password:string;
    rol: "administrator" | "client";
}

declare namespace Express{
    export interface Request{
        user?:IUser
    }
}