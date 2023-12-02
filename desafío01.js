class ProductManager{

    #id = 0
    constructor(){
        this.products = []
    }

    addProdcut(title, description, price, thumbnail, code, stock) {

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
                })}
        
        }


    }

    getProducts(){
        this.products.map(valor=>{
            console.log(valor)
        })
    }

    getProductBtId(id){
        let variable = 0
        this.products.map(value2 => {
            const producto = Object.values(value2)
            if(producto[0] == id){
                console.log(value2)
                variable = 1
            }
        })
        if (variable == 0) console.log("Not found")
    }
  
}

let productManager = new ProductManager()
// prueba de producto sin todos los campos llenados
productManager.addProdcut("Batman R.I.P.", "El origen (histórico y real) del verdadero nombre de Batman", 1000)
// prueba de creacion de producto correctamente
productManager.addProdcut("Batman the killing joke", "un recorrido en la oscura psique del principe payaso del crimen", 2000, "x", 157, 300)
// prueba de repeticion de code
productManager.addProdcut("Batman Hush", "¿Batman podra contra Silencio?", 3000, "x", 157, 300)
productManager.addProdcut("Batman and son", "El hijo de batman!", 2500, "x", 157, 300)
// creacion de producto para pruebas de getById
productManager.addProdcut("The Batman Who Laughs", "Un batman que rie? tenebroso!", 2500, "x", 158, 300)
// prueba de metodo getById
productManager.getProductBtId(2)
productManager.getProductBtId(4)
productManager.getProductBtId(5)
productManager.getProductBtId(7)
productManager.getProductBtId(3)
// prueba de metodo getProducts
productManager.getProducts()
