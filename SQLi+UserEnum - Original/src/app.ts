import express, { json } from "express";
import "express-async-errors";
import { UserRoutes } from "./routes";


const app = express();

app.use(json());

app.use(UserRoutes);

app.get('/', (req, res) => {
    res.send('Não tem nada aqui!!')
})


export { app }


