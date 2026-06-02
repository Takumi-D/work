import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import workTypeRouter from "./routers/work-type";
import ReferenceRouter from "./routers/reference";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors());
server.use(express.json());

server.use(workTypeRouter);
server.use(ReferenceRouter);


server.listen(PORT, async () => {
    await prisma.$connect();
    console.log("Listening on port: " + PORT);
});