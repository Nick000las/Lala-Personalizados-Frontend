import express from "express";
import 'dotenv/config';
import getProductRoutes from "./src/routes/productRoutes.js";

const app = express();
app.use(express.json());

getProductRoutes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});
