import {Schema,model} from"mongoose";

interface IUser {
    name:string;
    email:string;
    lastName:string;
    password:string;
    rol: "administrator" | "client";
}

const UserSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        enum:["adminitrator","client"],
        default:"client"
    }
})

export const UserModel = model("users",UserSchema);