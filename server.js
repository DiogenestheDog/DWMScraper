import express from 'express';
import path from 'path';
import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient;
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
let port = process.env.PORT;

if (port == null || port == "") {
    port = "8000";
}

app.use(express.static(join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`I'm here on port ${port}`);
    console.log("Did you know that I love you?");
});
