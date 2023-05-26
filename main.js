import {promises as fs} from "fs";

class ProductManager {
    constructor() {
        this.patch = "./products.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        ProductManager.id++;

        let newProduct ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id,
        };

        this.products.push (newProduct);
        
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    }


    readProducts = async () => {
        let respond = await fs.readFile(this.patch, "utf-8");
        return JSON.parse(respond);
    }


    getProducts = async () => {
        let respond2 = await this.readProducts();
        return console.log(respond2);
    }


    getProductsById = async (id) => {
        let respond3 = await this.readProducts();
        if(!respond3.find(product => product.id === id)){
            console.log("No se encontro el producto")
        } else {
            console.log(respond3.find(product => product.id === id));
        }
    }


    deleteProduct = async (id) => {
        let respond3 = await this.readProducts();
        let productFilter = respond3.filter(products => products.id != id)

        await fs.writeFile(this.patch, JSON.stringify(productFilter));

        console.log("Producto eliminado");
    }


    updateProduct = async ({id, ...product}) => {
        await this.deleteProduct(id);
        let oldProduct = await this.readProducts()

        let modifiedProducts = [{id, ...product}, ...oldProduct]

        await fs.writeFile(this.patch, JSON.stringify(modifiedProducts));
    }
}

const products = new ProductManager;

products.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
products.addProduct("producto prueba2", "Este es un producto prueba", 200, "Sin imagen", "abc123", 24);

products.getProducts();

products.getProductsById();

products.deleteProduct();

products.updateProduct()