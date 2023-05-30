import {promises as fs} from "fs";

export default class ProductManager {
    constructor() {
        this.patch = "./products.txt";
        this.products = [];
        this.newId = 1;
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        try {
            const productExist = this.products.find(
                (product) => product.code === code
            );
            if (productExist) {
                console.log(`Producto "${title}" tiene un error, el codigo "${code}" es el mismo del producto "${productExist.title}".`);
                return;
            }
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log(`Todos los campos son obligatorios en el producto "${title}" que estas intentando ingresar`);
                return;
            } 

        let newProduct ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.newId++,
        };

        this.products.push (newProduct);
        
        await fs.writeFile(this.patch, JSON.stringify(this.products));
        } catch (error) {console.log(error)}

    }

    readProducts = async () => {
        try {
            let respond = await fs.readFile(this.patch, "utf-8");
            return JSON.parse(respond);
        } catch (error) {
            console.log(error);
        }
        
    }


    getProducts = async () => {
        try {
            let respond2 = await this.readProducts();
            return console.log(respond2);
        } catch (error) {
            console.log(error);
        }
        
    }


    getProductsById = async (id) => {
        try{
            let respond3 = await this.readProducts();
            let productFilter = respond3.find((product) => product.id === id);
            console.log(productFilter);
        } catch (error) {
            console.log(error);
        }
    }


    deleteProduct = async (id) => {
        let respond3 = await this.readProducts();
        let productFilter = respond3.filter(products => products.id != id)

        await fs.writeFile(this.patch, JSON.stringify(productFilter));

        console.log("Producto eliminado");
    }


    // updateProduct = async ({id, ...product}) => {
    //     await this.deleteProduct(id);
    //     let oldProduct = await this.readProducts()

    //     let modifiedProducts = [{id, ...product}, ...oldProduct]

    //     await fs.writeFile(this.patch, JSON.stringify(modifiedProducts));
    // }

    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
        try {
            let toUpdateProduct = await this.readProducts();
            let productUpdate = toUpdateProduct.findIndex(
                (product) => product.id === id
            );
            if (productUpdate.length > 0) {
                return;
            }
            let codeExists = toUpdateProduct.some((product) => product.code === code);
            if (codeExists) {
                return console.log('El "code" ingresado esta duplicado');
            }
            if (
                !id ||
                !title ||
                !description ||
                !price ||
                !thumbnail ||
                !code ||
                !stock
            ) {
            console.log('No se puede actualizar el producto con campos vacios');
            return;
            }

            if (productUpdate !== -1) {
                toUpdateProduct[productUpdate].title = title;
                toUpdateProduct[productUpdate].description = description;
                toUpdateProduct[productUpdate].price = price;
                toUpdateProduct[productUpdate].thumbnail = thumbnail;
                toUpdateProduct[productUpdate].code = code;
                toUpdateProduct[productUpdate].stock = stock;
                await fs.writeFile(this.path, JSON.stringify(toUpdateProduct));
                console.log(`Producto actualizado`);
            } else {
                console.log(
                `No existe el producto con el id ingresado que quieres actualizar`
                );
            }
            } catch (error) {
            console.error('Se produjo un error:', error);
            }
        };
}

const products = new ProductManager;

products.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
products.addProduct("producto prueba2", "Este es un producto prueba", 200, "Sin imagen", "abc123", 24);
products.addProduct("producto prueba3", "Este es un producto prueba", 200, "Sin imagen", "abc123", 23);
products.addProduct("producto prueba4", "Este es un producto prueba", 200, "Sin imagen", "abc123", 22);
products.addProduct("producto prueba5", "Este es un producto prueba", 200, "Sin imagen", "abc123", 21);
products.addProduct("producto prueba6", "Este es un producto prueba", 200, "Sin imagen", "abc123", 26);
products.addProduct("producto prueba7", "Este es un producto prueba", 200, "Sin imagen", "abc123", 27);
products.addProduct("producto prueba8", "Este es un producto prueba", 200, "Sin imagen", "abc123", 28);
products.addProduct("producto prueba9", "Este es un producto prueba", 200, "Sin imagen", "abc123", 29);
products.addProduct("producto prueba10", "Este es un producto prueba", 200, "Sin imagen", "abc123", 20);

products.getProducts();

products.getProductsById(2);

products.deleteProduct();

products.updateProduct()