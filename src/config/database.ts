import { Db, MongoClient } from 'mongodb';


const client = new MongoClient("mongodb+srv://Guillermo:morales@cluster0.alwxhot.mongodb.net/");
export const connectMongo = ():Promise<Db> => {

    return client.connect().then(()=>{
        console.log("Conectado al Monguito");

        return client.db("Vicio")
    }).catch((error)=>{
        console.log("Error al conectar con Mongo");
        throw error;
    })

}
