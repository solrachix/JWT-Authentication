require("dotenv").config();
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// Carrega o model de Usuário
// require("./src/models/user");

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(process.env.PORT_APP || 3333);