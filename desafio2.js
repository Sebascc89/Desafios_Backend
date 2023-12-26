class ProductManager {
    constructor(){
        this.products = []
    }

    static id = 0

    addProducts(title, description, price, thumbnail, code, stock){
        for(let i=0;i<this.products.length;i++){
            if(this.products[i].code === code){
                console.log(`Error! The code ${code} is repeated.`);
                break;
            }
        }
        
        ProductManager.id++
        this.products.push({title, description, price, thumbnail, code, stock, id:ProductManager.id})
    }

    getProduct(){
        return this.products;
    }

    getProductById(id){
        if(!this.products.find((product) => product.id === id)){
            console.log("Not found")
        } else {
            console.log("The product exists")
        }
    }
}

const theProducts = new ProductManager

theProducts.addProducts('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
theProducts.addProducts('Producto prueba 2', 'Este es un producto prueba 2', 100, 'Sin imagen', 'abc124', 10);

console.log(theProducts.getProduct());
theProducts.getProductById(1)