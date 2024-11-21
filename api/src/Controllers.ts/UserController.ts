import { Request, Response } from "express"
import { UserModel } from "../models/Usermodel"


export const registerUsers = async (req:Request,res:Response):Promise<any>=>{
    try{
        // Primero validar que los datos existen
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const lastNames = req.body.rol
        const rol = req.body.rol
        //Administradores no pueden crear clientes 
        if (req.user?.rol === "administrator" && rol === "client"){
            return res.status(400).json ({msg:"los admonistradores no pueden crear clientes"})
        }
        if(!name || !email ||!lastNames  ||!password ||!rol){
            return res.status(400).json({
                msg:"Faltan datos para crear un usuario"
            })
        }
        // validar que el usuario a crear sea administrador
        if(rol === " administrador" && req.user?.rol != "administrator"){
            return res.status(400).json({
                msg:"no puedes crear un administrador si no lo eres uno"
            })
        }
        await UserModel.create({
            name: name,
            lastNames:lastNames,
            email:email,
            password:password,
            rol:rol,

        })


return res.status(200).json({msg: "usuario registrado con exito"})
    }catch (error){
        console.log(error);
        return res.status(500).json({msg: "Hubo un error al crear un usuario"})


    }

}