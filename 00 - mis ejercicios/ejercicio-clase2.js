class ProductManager {
    constructor() {
        this.products=[];
      }

    addProduct(title, description, price, thumbnail, code, stock){
        let checkCode = this.products.find(product => product.code === code);
        if (checkCode){
            console.log('This code is already registered. Please access a new code')
            } else if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log('Missing information. Please complete all the products fields')
                } else {
                    this.products.push({
                      id: this.products.length + 1,
                      title,
                      description,
                      price,
                      thumbnail,
                      code,
                      stock,
            })
        }

    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        let product = this.products.find(product => product.id === id);
        if (product){
            return product
            } else { 
                console.log('Not found')
            }
    } 
}

let newProductList = new ProductManager();
newProductList.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
newProductList.addProduct('producto prueba 1', 'Este es un producto prueba 1', 200, 'Sin imagen', 'abc123', 25);
newProductList.addProduct('producto prueba 2', 'Este es un producto prueba 2', 200, 'Sin imagen', 'def456', 30);
newProductList.addProduct('producto prueba 3', 'Este es un producto prueba 2', 'Sin imagen', 'def456', 30);
console.log('Lista de Productos: ', newProductList.getProducts())
console.log('Busqueda de Productos por Id: ', newProductList.getProductById(2))
console.log('Busqueda de Productos por Id: ', newProductList.getProductById(5))
