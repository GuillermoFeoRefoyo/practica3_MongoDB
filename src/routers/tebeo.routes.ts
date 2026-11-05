import { Router } from "express";
import {
    getTebeos,
    getTebeosId,
    createTebeo,
    deleteTebeo,
    changeTebeo

}from "../controllers/tebeo.controller.js";


const router = Router();


router.get("/", getTebeos);
router.get("/:id", getTebeosId);
router.delete("/:id", deleteTebeo);
router.post("/", createTebeo);
router.put("/:id", changeTebeo);


export default router;