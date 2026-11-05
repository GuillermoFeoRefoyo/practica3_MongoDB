import express from "express";
import tebeoRoutes from "./routers/tebeo.routes.js"
import { connectMongo } from "./config/database.js";
import { configCollection } from "./controllers/tebeo.controller.js";
import type { Collection } from "mongodb";
import type { TebeoT } from "./models/tebeo.model.js";




const app = express();

app.use(express.json());

const startServer = () => {


    connectMongo().then((db)=>{
        const peliculasCollection:Collection<TebeoT> = db.collection("Peliculillas");
        configCollection(peliculasCollection);

        app.use("/tebeos",tebeoRoutes);

        app.listen(3001, ()=>{
            console.log("Api funcionando en el puerto 3001")
        })

    }).catch(()=>{
        console.log("No se ha podido conectar a Mongo, así que nada de API guapín")
    })

};

startServer();