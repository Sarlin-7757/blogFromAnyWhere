import express from 'express';
import {config} from "dotenv"
import appRouter from './routes/index.js';
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';

config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/blog-post.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'blog-post.html'));
});

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.use("/api/", appRouter);

export default app;