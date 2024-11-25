import { Request, Response } from "express"
import { UserModel } from "../models/Usermodel"
import Jwt from "jsonwebtoken";

export const registerUsers = async (req:Request,res:Response):Promise<any>=>{
    try{
        // Primero validar que los datos existen
        const name = req.body.name
        const email = req.body.email
        const lastname = req.body.lastname
        const password = req.body.password
        const rol = req.body.rol
        //Administradores no pueden crear clientes 
        if (req.user?.rol === "administrator" && rol === "client"){
            return res.status(400).json ({msg:"los admonistradores no pueden crear clientes"})
        }
        if(!name || !email ||!lastname  ||!password ||!rol){
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
       const user = await UserModel.create({
            name: name,
            email:email,
            lastname: lastname,
            password:password,
            rol:rol,

        });

        const token = Jwt.sign(JSON.stringify(user),"pocoyo");
        res.status(200).json({msg:"usuario regisyrado con exito", token})



return res.status(200).json({msg: "usuario registrado con exito"})
    }catch (error){
        console.log(error);
        return res.status(500).json({msg: "Hubo un error al crear un usuario"})


    }

}


export const singin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email, password });
        if (!user) {
            res.status(401).json({ message: "usuario inexistente" });
            return;
        }
        const token = Jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET || "secretKey",
        );
        res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "no jala :(", error });
    }
};