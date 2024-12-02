import { Request, Response } from "express";
import { UserModel } from "../models/Usermodel";
import jwt from "jsonwebtoken";

export const registerUsers= async (req:Request, res:Response):Promise<any> =>{
    try {


        const name = req.body.name
        const lastName = req.body.lastname
        const email = req.body.email
        const password = req.body.password
        const rol = req.body.rol

        if (req.user?.rol === "administrator" && rol ==="client"){
            return res.status(400).json({
                msg:"los admins no puedes crear clientes"
            })
        }

        if(!name || !email || !lastName || !password || !rol){
            return res.status(400).json({
                msg:"faltan datos we"
            })
        }

        if(rol==="administrator " && req.user?.rol != "administrator"){
            return res.status(400).json({
                msg:"no pudes crear un admin si no lo eres"
            })
        }

        const user = await UserModel.create({
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            rol: rol
        })

        const token = jwt.sign(JSON.stringify(user),"shhh")

        return res.status(200).json({
            msg:"usuario registrado con exito", token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"error al crear el usuario"
        })
    }
}

export const singin= async (req:Request, res: Response):Promise<any>=>{
    //correo y contrseña
    //Verificr que el usuario existe
    //si no existe devuelve un error
    //Soi existe devuelve un o
    try {
        const user = await UserModel.findOne({email:req.body.email, password:req.body.password})
        
       if(!user){
        res.status(400).json({msg: "No hay coincidencias en el sistema"

        })
        return;
       }
        const token = jwt.sign(JSON.stringify(user),"pocoyo");
        res.status(200).json({msg: "Sesión iniciada con exito", token})
        return

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Hubo un error al iniciar sesion"
        })
    }

}