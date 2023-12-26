// Importar fileSystem
const fs = require('fs')

class ProductManager {
    constructor(){
        // Por medio del constructor creo la ruta para el archivo de los productos
        this.patch = "./productos.txt";
        this.products = []
    }

    static id = 0

    // Método para agregar los productos en el formato indicado y asignándole un id automáticamente al archivo
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        for(let i=0;i<this.products.length;i++){
            if(this.products[i].code === code){
                console.log(`Error! The code ${code} is repeated.`);
                break;
            }
        }

        ProductManager.id++
        
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id,
        }

        this.products.push(newProduct)

        await fs.promises.writeFile(this.patch, JSON.stringify(this.products))
    };
    
    // Función para leer el archivo y convertir el string en objeto
    readProducts = async () => {
        let reply1 = await fs.promises.readFile(this.patch, "utf-8")
        return JSON.parse(reply1)
    };

    // Método para leer el archivo y devolver los productos en formato de arreglo
    getProducts = async () => {
        let reply2 = await this.readProducts()
        return console.log(reply2)
    };

    // Método para buscar un producto específico por medio de su id en el arhcivo y retornarlo en formato objeto
    getProductById = async (id) => {
        let reply3 = await this.readProducts()
        if(!reply3.find(product => product.id === id)){
            console.log("Not found")
        } else {
            console.log(reply3.find(product => product.id === id))
        }
    };

    // Método para actualizar un producto específico por medio de su id
    updateProducts = async ({id, ...product}) => {
        await this.deleteProductsById(id);
        let prodUpdate = await this.readProducts();
        let productsUpdate = [{...product, id}, ...prodUpdate]
        await fs.promises.writeFile(this.patch, JSON.stringify(productsUpdate   ))
    };

    // Método para un producto especificando su id
    deleteProductsById = async (id) => {
        let reply4 = await this.readProducts()
        let filter2 = reply4.filter(products => products.id != id)
        await fs.promises.writeFile(this.patch, JSON.stringify(filter2));
        console.log("Deleted product")
    }
}

const products = new ProductManager

products.addProduct('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
products.addProduct('Producto prueba 2', 'Este es un producto prueba 2', 100, 'Sin imagen', 'abc124', 10)
products.addProduct('Producto prueba 3', 'Este es un producto prueba 3', 300, 'Sin imagen', 'abc125', 30)

products.getProducts()

products.getProductById(4)

products.updateProducts({
    title: 'Producto prueba 3 actualizado',
    description: 'Este es un producto prueba 3 actualizado',
    price: 300,
    thumbnail: 'Sin imagen',
    code: 'abc125'
    stock: 30,
    id: 3
})

products.deleteProductsById(2)