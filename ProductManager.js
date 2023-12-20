const { promises: fs } = require('fs')

class ProductManager {
    constructor(path) {
        this.path=path;
      }

    async addProduct(title, description, price, thumbnail, code, stock){
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
           console.error('Missing information. Please complete all the products fields');
           return;
        }

        const checkCode = this.products.some(product => product.code  === code)
        if (checkCode) {
          console.log('This code is already registered. please access a new code');
          return
        }

        const pushProducts = await getJSONFromFile(this.path);
                    products.push({
                      id: products.length + 1,
                      title,
                      description,
                      price,
                      thumbnail,
                      code,
                      stock,
                    })
                    await saveJSONToFile(this.path, products);
    }

    async getJSONFromFile(path) {
        try {
          await fs.access(path);
        } catch (error) {
          return [];
        }
        const content = await fs.readFile(path, 'utf-8');
        try {
          return JSON.parse(content);
        } catch (error) {
          throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
        }
    }
        
    async saveJSONToFile (path, data) {
       const content = JSON.stringify(data, null, '\t');
       try {
         await fs.writeFile(path, content, 'utf-8');
       } catch (error) {
         throw new Error(`El archivo ${path} no pudo ser escrito.`);
       }
    }

    getProducts(){
        return getJSONFromFile(this.path)
    }

    getProductById(id){
        let product = getProducts().find(product => product.id === id);
        if (product){
            return product
            } else { 
                console.log('Product not found')
            }
    } 

    async updateProduct(id, data){
        let product = getProducts().find(product => product.id === id);
        try {
            let updateProduct = JSON.stringify()
            await fs.appendFile(updateProduct, data)
            } catch { 
                console.log('Product couldnt be updated')
            }
    }

    deleteProduct(id){
        let product = getProducts().find(product => product.id === id);
        if (product){
            fs.writeFileSync(this.path, JSON.stringify(product, null));
            console.log('Product deleted succesfully')
            } else { 
                console.log('Product couldnt be deleted')
            }
    } 
}

let newProductList = new ProductManager('./products.json');
console.log('Lista de Productos vacio: ', newProductList.getProducts())

newProductList.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
newProductList.addProduct('producto prueba 1', 'Este es un producto prueba 1', 250, 'Sin imagen', 'abc223', 28);
newProductList.addProduct('producto prueba 2', 'Este es un producto prueba 2', 300, 'Sin imagen', 'def456', 30);
console.log('Lista de Productos: ', newProductList.getProducts())

console.log('Busqueda de Productos por Id: ', newProductList.getProductById(2))
console.log('Busqueda de Productos por Id: ', newProductList.getProductById(5)) 

newProductList.updateProduct(1, 'producto actualizado');
console.log('Lista de Productos: ', newProductList.getProducts())
