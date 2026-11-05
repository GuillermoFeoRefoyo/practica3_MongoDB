import type {Request, Response} from "express";
import { ObjectId, type Collection } from "mongodb";
import type { TebeoT } from "../models/tebeo.model.js";


let tebeosColection: Collection<TebeoT>;


export const configCollection = (collection: Collection<TebeoT>)=>{
    tebeosColection=collection
}




export const getTebeos = (
    req: Request,
    res: Response
)=>{

    tebeosColection.find().toArray().then((tebeo)=>{
        res.status(200).json(tebeo)
    }).catch(()=>{
        res.status(500).json({
            message:"Peto la llamada"
        })
    })
}


export const getTebeosId = (
    req: Request,
    res: Response
)=>{
    const id= String(req.params.id);


    if(!ObjectId.isValid(id)){
        res.status(400).json({
            message: "Invalid ID"
        })
        return
    }

    tebeosColection.findOne({
        _id: new ObjectId(id)
    }).then((result)=>{
        if(!result){
            res.status(404).json({
                message: "Tebeo no encontrado"
            })
            return;
        }

        res.status(200).json({
            ...result,
            _id: result._id.toString()
        });
    }).catch((error)=>{
        res.status(500).json({
            message: "Algo ha ido mal al buscar la peli"
        })
    })
}



export const createTebeo = (
    req: Request,
    res: Response
)=>{
    const newTebeo: TebeoT = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    };

    if(!Number.isInteger(req.body.numero) ||
    req.body.numero <= 0 || typeof req.body.autor !== "string" || 
    typeof req.body.titulo !== "string" ||typeof req.body.editorial !== "string" ){
        res.status(400).json({
            message: "identificador incorrecto o datos invalidos"
        });
        return;
    }

    tebeosColection.insertOne(newTebeo).then((result)=>{
        res.status(201).json({
            _id: result.insertedId,
            ...newTebeo
        })
    }).catch(()=>{
        res.status(500).json({
            message: "Error al crear la pelicula"
        })
    })

}


export const changeTebeo = (
    req: Request,
    res: Response
)=>{
    const id = String(req.params.id);

    if(!ObjectId.isValid(id) || !Number.isInteger(req.body.numero) ||
    req.body.numero <= 0 || typeof req.body.autor !== "string" || 
        typeof req.body.titulo !== "string" ||typeof req.body.editorial !== "string" ){
        res.status(400).json({
            message: "identificador incorrecto o datos invalidos"
        })
        return
    }


    const peliActualizada:TebeoT = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    }

    tebeosColection.replaceOne({
        _id: new ObjectId(id)
    }, peliActualizada).then((result)=>{
        if(result.matchedCount === 0){
            res.status(404).json({
                message: "el tebeo no existe"
            })
            return
        }

        res.status(200).json({
            _id: new ObjectId(id),
            ...peliActualizada
        })
    }).catch(()=>{
        res.status(500).json({
            message: "error interno del servidor"
        })
    })
}


export const deleteTebeo = (
    req: Request,
    res: Response
)=>{
    const id = String(req.params.id);

    if(!ObjectId.isValid(id)){
        res.status(400).json({
            message: "Identificador incorrecto"
        })
        return
    }


    tebeosColection.findOneAndDelete({
        _id: new ObjectId(id)
    }).then((result)=>{
        if(!result){
            res.status(404).json({
                message: "el tebeo no existe"
            })
            return
        }

        res.status(200).json({
            ...result,
            _id: result?._id.toString()
        });
    }).catch(()=>{
        res.status(500).json({
            message: "error interno del servidor"
        })
    })
}
