const {promises : fs} = require('fs')

class ProductManager{

    constructor(path){
        this.products = []
        this.path = path
        this.estadoPeticion = ""
    }


    async addProdcut(producto) {
        try { 
        this.products = await this.getProducts()
        if (!producto.title || !producto.description || !producto.price || !producto.code || !producto.stock || !producto.status || !producto.category) this.estadoPeticion = "llenar todos los campos"
        
        else{
            if(this.products.some(product => product.code == producto.code)) this.estadoPeticion = "El codigo de producto ya existe"
            else{
                this.products.push({
                    id: this.products.length ? this.products[this.products.length - 1].id + 1: 1,
                    title: producto.title,
                    description: producto.description,
                    price: producto.price,
                    thumbnail: producto.thumbnail,
                    code: producto.code,
                    stock: producto.stock,
                    status: producto.status,
                    category: producto.category
                })

                this.estadoPeticion = "Producto agregado correctamente"
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
            return []
        }
        
    }

    async getProductsLimited(limit){
            console.log(limit)
            let productsLimit = await this.getProducts()
            let newArrayLimit = []
            productsLimit.forEach((valor) => {
              if (valor.id <= limit || !limit) {
                newArrayLimit.push(valor)
              }
            })
            return newArrayLimit
    }



    async getProductBtId(id){
        try {
            const arregloJS = await this.getProducts()
            let variable = 0
            let objeto = {}
            arregloJS.map(value2 => {
            const producto = Object.values(value2)
            if(producto[0] == id){
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

            const campos = {
                numberCampos: ['price', 'code', 'stock', 'category'],
                stringCampos: ['title', 'description', 'thumbnail'],
                boolCampos: ['status']
            }

            const isOfType = (value, type) => typeof value == type
            
            if(producto[0] == id){
                // corroboracion de que existe el campo que se desea modificar
                const keys = Object.keys(value2)
                if (!keys.includes(campoActualizar) || campoActualizar == 'id'){
                    console.log("no es posible modificar el campo que se esta solicitando")
                }
                else{
                    // corroboracion de tipo
                    if(campos.numberCampos.includes(campoActualizar) && isOfType(nuevoValorCampo, "number")){
                        value2[campoActualizar] = nuevoValorCampo
                    } else if(campos.stringCampos.includes(campoActualizar) && isOfType(nuevoValorCampo, "string")){
                        value2[campoActualizar] = nuevoValorCampo
                    } else if(campos.boolCampos.includes(campoActualizar) && isOfType(nuevoValorCampo, "boolean")){
                        value2[campoActualizar] = nuevoValorCampo
                    } else{
                        console.log("Error en el tipo del nuevo valor para el campo, no se ha modificado")
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