import express, { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();


router.post("/work-type-form", async (req: Request, res: Response) => {
    try {
        await prisma.workType.create({
            data: {
                name: req.body.name,
            }
        });

        res.json({ message: "Получено" });
    } catch (error){
        res.status(500).json({
            error: "Ошибка при добавлении",
        })
    }
});

router.get("/work-type-form", async (req: Request, res: Response) => {
    try {
       const response = await prisma.workType.findMany();

        res.json({data: response});
    } catch (error){
        res.status(500).json({
            error: "Ошибка при добавлении",
        })
    }
});

export default router;