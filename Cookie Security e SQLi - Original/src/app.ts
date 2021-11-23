import express, { json } from "express";
import "express-async-errors";
import { UserRoutes } from "./routes";
import  cookieParser  from "cookie-parser";


const app = express();

app.use(json());
app.use(cookieParser());

app.use(UserRoutes);

app.get('/', (req, res) => {
    res.send('Não tem nada aqui!!')
})


export { app }


