import express from "express";

//Import Product Manager
import ProductManager from "./components/ProductManager.js";

//Creaciòn del servidor
const app = express();
app.use(express.urlencoded({extended: true}));

const products = new ProductManager;
const readProducts = products.readProducts();

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await readProducts);
    let allProducts = await readProducts;
    let productLimit = allProducts.slice(0,limit);
    res.send(productLimit);
});

app.get("/products/:pid", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id);
    res.send(productById);
    console.log(id);
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
});
server.on("error", () => {
    console.log(`Error del servidor ${error}`)
})