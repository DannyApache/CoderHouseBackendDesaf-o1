const cartManager = require('../instaciasCartsManager.js')
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()


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

router.post('/carts/:cid/product/:pid', async (req,res)=>{
    const {cid, pid} = req.params
    console.log(cid)
    console.log(pid)
    await cartManager.agregarProductosEnCarrito(cid, pid)
    res.send("finalizado creacion de carrito")
})

module.exports = router