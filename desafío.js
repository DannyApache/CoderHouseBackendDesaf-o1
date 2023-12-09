const {promises : fs} = require('fs')
const { title } = require('process')

class ProductManager{

    #id = 0
    #romper = 0
    constructor(path){
        this.products = []
        this.path = path
    }

    

    async addProdcut(title, description, price, thumbnail, code, stock) {
        try { 

        if ((title == undefined) || (description == undefined) || (price == undefined) || (thumbnail == undefined) || (code == undefined) || (stock == undefined)) console.log("llenar todos los campos")
        
        else{
            if (this.products.length == 0) {
                this.id = ++this.#id
                this.products.push({
                id: this.id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock})
            }

            else{
                this.products.forEach(value => {
                const array = Object.values(value)
                if (array.includes(code)) console.log("producto no creado por repeticion de code")
                else{
                    if (this.#romper == 0){
                    ++this.#romper
                    this.id = ++this.#id
                    this.products.push({
                    id: this.id,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock})
                }}
                })
                this.#romper = 0
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
            console.log(fileJS)
        } catch (error) {
            console.log(error)
        }
        
    }


    async getProductBtId(id){
        try {
            const arreglo = await fs.readFile(this.path, 'utf-8')
            const arregloJS = JSON.parse(arreglo)
            let variable = 0
            arregloJS.map(value2 => {
            const producto = Object.values(value2)
            if(producto[0] == id){
                console.log(value2)
                variable = 1
            }
        })
        if (variable == 0) console.log("Not found")

        } catch (error) {
            console.log(error)
        }
        
    }

    async updateProduct(id, campoActualizar, nuevoValorCampo){
        try {
            const arreglo = await fs.readFile(this.path, 'utf-8')
            const arregloJS = JSON.parse(arreglo)
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
            const arreglo = await fs.readFile(this.path, 'utf-8')
            const arregloJS = JSON.parse(arreglo)
            arregloJS.splice((id-1), 1)
            const arregloJSON = JSON.stringify(arregloJS, null, 2)
            await fs.writeFile(this.path, arregloJSON, 'utf-8')
         } catch (error) {
            console.log(error)
        }
    }
  
}

let productManager = new ProductManager('./products.json')

// productManager.addProdcut("Batman R.I.P.", "chao", 1000)
// productManager.addProdcut("Batman the killing joke", "chao1", 2000, "x", 157, 300)
// productManager.addProdcut("Batman Hush", "chao2", 3000, "x", 157, 300)
// productManager.addProdcut("Batman and son", "chao3", 2500, "x", 159, 300)
// productManager.addProdcut("The Batman Who Laughs", "chao4", 2500, "x", 158, 300)
// productManager.getProductBtId(2)
// productManager.getProductBtId(4)
// productManager.getProductBtId(5)
// productManager.getProductBtId(7)
// productManager.getProductBtId(3)
// productManager.getProducts()
// productManager.updateProduct(3, "title", "The Batman Who Laughs")
// productManager.deleteProduct(1)
