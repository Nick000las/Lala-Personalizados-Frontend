import controllerGetCategorias from "../controllers/productController.js";

const getPostRoutes = (app) => {
    app.get("/posts", controllerGetCategorias);
}

export default getPostRoutes;