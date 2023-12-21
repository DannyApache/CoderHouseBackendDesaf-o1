const {promises : fs} = require('fs')
const { title } = require('process')

class ProductManager{

    constructor(path){
        this.products = []
        this.path = path
    }


    async addProdcut(producto) {
        try { 

        if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) console.log("llenar todos los campos")
        
        else{
            if(this.products.some(product => product.code == producto.code)) console.log("El codigo de producto ya existe")
            else{
                this.products.push({
                    id: this.products.length ? this.products[this.products.length - 1].id + 1: 1,
                    title: producto.title,
                    description: producto.description,
                    price: producto.price,
                    thumbnail: producto.thumbnail,
                    code: producto.code,
                    stock: producto.stock})
            }
        }
            
        let productsJson = JSON.stringify(this.products, null, 2)
        await fs.writeFile(this.path, productsJson, 'utf-8')
        
            
    } catch (error) {
                console.log(error)
            }
        
        }


    async getProducts(){
        try {
            const file = await fs.readFile(this.path, 'utf-8')
            const fileJS = JSON.parse(file, null, 2)
            return fileJS
        } catch (error) {
            console.log(error)
        }
        
    }


    async getProductBtId(id){
        try {
            const arregloJS = await this.getProducts()
            let variable = 0
            let objeto = {}
            arregloJS.map(value2 => {
            const producto = Object.values(value2)
            if(producto[0] == id){
                // console.log(value2)
                variable = 1
                objeto = value2
            }
        })
        
        if(variable == 0) return "not found"
        else return objeto
        

        } catch (error) {
            console.log(error)
        }
        
    }

    async updateProduct(id, campoActualizar, nuevoValorCampo){
        try {
            const arregloJS = await this.getProducts()
            let variable = 0
            arregloJS.map(value2 => {
            const producto = Object.values(value2)
            if(producto[0] == id){
                // corroboracion de que existe el campo que se desea modificar
                const keys = Object.keys(value2)
                if (!keys.includes(campoActualizar) || campoActualizar == 'id'){
                    console.log("no es posible modificar el campo que se esta solicitando")
                }
                else{
                    // comprobacion de que se esta ingresando un valor numerico a los campos numericos
                    if ((campoActualizar == "price" || campoActualizar == "code" || campoActualizar == "stock") && (typeof nuevoValorCampo == "number")){
                        campoActualizar == 'price' ? value2.price = nuevoValorCampo : 0
                        campoActualizar == 'code' ? value2.code = nuevoValorCampo : 0
                        campoActualizar == 'stock' ? value2.stock = nuevoValorCampo : 0
                    }
                    else{
                        // corroboracion de que se esta ingresando un valor string a los campos
                        if(campoActualizar == "title" || campoActualizar == "description" || campoActualizar == "thumbnail" && typeof nuevoValorCampo == "string"){
                            campoActualizar == "title" ? value2.title = nuevoValorCampo : 0
                            campoActualizar == 'description' ? value2.description = nuevoValorCampo : 0
                            campoActualizar == 'thumbnail' ? value2.thumbnail = nuevoValorCampo : 0
                        }
                        else{
                            console.log("error en el tipo del nuevo valor para el campo, no se ha modificado")
                        }
                    }
                 
                }

                variable = 1
            }
        })
        
        const arregloJSON = JSON.stringify(arregloJS, null, 2)
        await fs.writeFile(this.path, arregloJSON, 'utf-8')

        if (variable == 0) console.log("Not found")

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            const arregloJS = await this.getProducts()
            arregloJS.splice((id-1), 1)
            const arregloJSON = JSON.stringify(arregloJS, null, 2)
            await fs.writeFile(this.path, arregloJSON, 'utf-8')
         } catch (error) {
            console.log(error)
        }
    }
  
}


module.exports = ProductManager