import type { ObjectId } from "mongodb"


export type TebeoT = {
    _id?: ObjectId;
    titulo: string;
    autor: string;
    editorial: string;
    numero: number;
    fechaPublicacion: string;
    precio: number;
    leido: boolean;
};

export type ErrorAPI = {
    error: string;
};