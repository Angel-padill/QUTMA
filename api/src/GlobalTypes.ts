import {Schema} from "mongoose";

export interface IAnswer{
    questionaireId:Schema.Types.ObjectId | string;
    questionId: Schema.Types.ObjectId | string;
    answer:string;
}

export interface IOptions{
    title:String,
    questionId: Schema.Types.ObjectId | string;
}

export interface IQuestionnaire{
    title: String,
    description: string,
    IdUsuario: String,
}  

export interface IQuestion{
    title: String;
    typo: "radio" | "chackbox" | "select" | "text",
    isMandatory:boolean,
    questionaireId:Schema.Types.ObjectId | String;
}

export interface IUser {
    name:string;
    email:string;
    lastname:string;
    password:string;
    rol: "administrator" | "client";
}