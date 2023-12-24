const path = require('path')
const CartManager = require('../../../ProductManager/cartsManager.js')
const express = require('express')
const bodyParser = require('body-parser')
const ProductManager = require('../../../ProductManager/productManager.js')
const router = express.Router()

const cartFilePath = path.resolve(__dirname, '../../data/carts.json')
const productFilePath = path.resolve(__dirname, '../../data/products.json')

let cartManager = new CartManager(cartFilePath)
let productManager = new ProductManager(productFilePath)

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

router.get('/carts/:cid', async (req, res)=>{
    const {cid} = req.params
    let products = await cartManager.getProductsById(cid)
    res.json(products)
})

router.post('/carts', async (req,res)=>{
    const cartRecibido = req.body
    await cartManager.addCart(cartRecibido)
    res.send("finalizado creacion de carrito")
})

// trabajando en este
router.post('/carts/:cid/product/:pid', async (req,res)=>{
    const {cid, pid} = req.params
    console.log(cid)
    console.log(pid)
    await cartManager.agregarProductosEnCarrito(cid, pid)
    res.send("finalizado creacion de carrito")
})

module.exports = router