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

productManager.addProdcut("Batman R.I.P.", "chao", 1000)
productManager.addProdcut("Batman the killing joke", "chao1", 2000, "x", 157, 300)
productManager.addProdcut("Batman Hush", "chao2", 3000, "x", 157, 300)
productManager.addProdcut("Batman and son", "chao3", 2500, "x", 157, 300)
productManager.addProdcut("The Batman Who Laughs", "chao4", 2500, "x", 158, 300)
productManager.getProductBtId(2)
productManager.getProductBtId(4)
productManager.getProductBtId(5)
productManager.getProductBtId(7)
productManager.getProductBtId(3)
productManager.getProducts()
