import express, { Request, Response } from 'express';

import prisma from "../../prisma/prismaClient"

const router = express.Router();


router.post("/reference-form", async (req: Request, res: Response) => {
    try {
        await prisma.journalEntry.create({
            data: {
                date: new Date(req.body.date),
                workTypeId: Number(req.body.workTypeId),
                volume: parseFloat(req.body.volume),
                unit: req.body.unit,
                workerName: req.body.workerName
            }
        });

        res.json({ message: "Получено" });
    } catch (error){
        res.status(500).json({
            error: "Ошибка при добавлении",
        })
    }
});

router.get("/reference-form", async (req: Request, res: Response) => {
    try {
        const response = await prisma.journalEntry.findMany(
            {
                include: {
                    workType: true
                }
            }
        );

        res.json({data: response});
    } catch (error){
        res.status(500).json({
            error: "Ошибка при добавлении",
        })
    }
});

router.get("/reference-form/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const entry = await prisma.journalEntry.findUnique({
            where: { id },
            include: { workType: true }
        });

        if (!entry) {
            res.status(404).json({ error: "Запись не найдена" });
            return;
        }

        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении" });
    }
});

router.put("/reference-form/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const exists = await prisma.journalEntry.findUnique({ where: { id } });
        if (!exists) {
            res.status(404).json({ error: "Запись не найдена" });
            return;
        }

        const updated = await prisma.journalEntry.update({
            where: { id },
            data: {
                date: new Date(req.body.date),
                workTypeId: Number(req.body.workTypeId),
                volume: parseFloat(req.body.volume),
                unit: req.body.unit,
                workerName: req.body.workerName
            }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при обновлении" });
    }
});

router.delete("/reference-form/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const exists = await prisma.journalEntry.findUnique({ where: { id } });
        if (!exists) {
            res.status(404).json({ error: "Запись не найдена" });
            return;
        }

        await prisma.journalEntry.delete({
            where: { id }
        });

        res.json({ message: "Удалено" });
    } catch (error) {
        res.status(500).json({ error: "Ошибка при удалении" });
    }
});



export default router;