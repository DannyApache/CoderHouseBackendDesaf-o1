const {promises : fs} = require('fs')
const { title } = require('process')

class CartsManager{

    constructor(path){
        this.carts = []
        this.path = path
    }


    async addCart(cart) {
        try { 
        this.carts = await this.getCarts()
        this.carts.push({
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1: 1,
            productos: cart.productos
        })
        let cartsJson = JSON.stringify(this.carts, null, 2)
        await fs.writeFile(this.path, cartsJson, 'utf-8')
        }
 
     catch (error) {
                console.log(error)
        }
    }


    async getCarts(){
        try {
            const file = await fs.readFile(this.path, 'utf-8')
            const fileJS = JSON.parse(file, null, 2)
            return fileJS
        } catch (error) {
            console.log(error)
            return []
        }
    }


    async getProductsById(id){
        try {
            const arregloJS = await this.getCarts()
            let variable = 0
            let objeto = []
            arregloJS.map(value2 => {
            const cart = Object.values(value2)
            if(cart[0] == id){
                variable = 1
                objeto = cart[1]
            }
        })
        
        if(variable == 0) return "not found"
        else return objeto
        

        } catch (error) {
            console.log(error)
            return []
        }
        
    }


    async getCartByID(id){
        try {
            const arregloJS = await this.getCarts()
            let variable = 0
            let objeto = []
            arregloJS.map(value2 => {
            const cart = Object.values(value2)
            if(cart[0] == id){
                variable = 1
                objeto = value2
            }
        })
        
        if(variable === 0) return "not found"
        else return objeto
        

        } catch (error) {
            console.log(error)
            return []
        }
    }


    async agregarProductosEnCarrito(cid, pid){
        try {
            const arregloJS = await this.getCarts()
            let variable = 0
            arregloJS.map(value2 => {
            const cart = Object.values(value2)
            if(cart[0] == cid){
                value2.productos.map(value3 => {
                    if(value3.id === pid){
                        variable = 1
                        value3.quantity = value3.quantity + 1
                    }
                })
                if(variable === 0) value2.productos.push({"id":pid, "quantity":1 })
                }
            }
        )
        
        const arregloJSON = JSON.stringify(arregloJS, null, 2)
        await fs.writeFile(this.path, arregloJSON, 'utf-8')

        if (variable == 0) console.log("Not found")

        } catch (error) {
            console.log(error)
            return []
        }
    }


}


module.exports = CartsManager