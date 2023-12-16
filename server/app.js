const ProductManager = require('./../ProductManager/desafío.js')
const express = require('express')

let productManager = new ProductManager('./../products.json')
// productManager.addProdcut("Batman the killing joke", "chao1", 2000, "x", 157, 300)
// productManager.addProdcut("Batman and son", "chao3", 2500, "x", 159, 300)
// productManager.addProdcut("The Batman Who Laughs", "chao4", 2500, "x", 158, 300)

const app = express()

const port = 8000



app.get('/products', async (req, res)=>{
        const {limit} = req.query
        console.log(limit)
        let products =  await  productManager.getProducts()
        let newArray = []
        products.forEach(valor => {
            if(valor.id <= limit || !limit){
                newArray.push(valor)
            }
        })
        res.json(newArray)
})

app.get('/products/:pid', async (req, res)=>{
        const {pid} = req.params
        let products = await  productManager.getProductBtId(pid)
        res.json(products)
    })

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})
