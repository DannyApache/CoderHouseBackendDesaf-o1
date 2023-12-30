const productManager = require('../instanciasProductManager.js')
const express = require('express')
const bodyParser = require('body-parser')
const socket = require('../socket.js')

const router = express.Router()


router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

router.get('/products', async (req, res)=>{
    const {limit} = req.query
    const newArray = await productManager.getProductsLimited(limit)
    res.render('home', {products : newArray})
})

router.get('/realtimeproducts', async (req, res)=>{
    const newArray = await productManager.getProductsLimited()
    res.render('realTimeProducts', {products : newArray})
})

router.get('/products/:pid', async (req, res)=>{
    const {pid} = req.params
    let products = await productManager.getProductBtId(pid)
    res.json(products)
})

router.post('/products', async (req,res)=>{
    const productoRecibido = req.body
    await productManager.addProdcut(productoRecibido)
    res.send(productManager.estadoPeticion)
    const arrayProductosActuales = await productManager.getProducts()
    socket.io.emit('enviarProductos', {dato : arrayProductosActuales})
})

router.put('/products/:pid', async(req, res)=>{
    const {pid} = req.params
    const parametroRecibido = req.body
    const{
        title: cambioTitle,
        description : cambioDescription, 
        code: cambioCode, 
        price: cambioPrice, 
        status: cambioStatus, 
        stock: cambioStock, 
        category: cambioCategory, 
        thumbnail: cambioThumbnail
    } = parametroRecibido

    !cambioTitle ? 0 : await productManager.updateProduct(pid, 'title', cambioTitle)
    !cambioDescription ? 0 : await productManager.updateProduct(pid, 'description', cambioDescription)
    !cambioCode ? 0 : await productManager.updateProduct(pid, 'code', cambioCode)
    !cambioPrice ? 0 : await productManager.updateProduct(pid, 'price', cambioPrice)
    !cambioStatus ? 0 : await productManager.updateProduct(pid, 'status', cambioStatus)
    !cambioStock ? 0 : await productManager.updateProduct(pid, 'stock', cambioStock)
    !cambioCategory ? 0 : await productManager.updateProduct(pid, 'category', cambioCategory)
    !cambioThumbnail ? 0 : await productManager.updateProduct(pid, 'thumbnail', cambioThumbnail)
    res.send("campos modificados")
    const arrayProductosActuales = await productManager.getProducts()
    socket.io.emit('enviarProductos', {dato : arrayProductosActuales})
})

router.delete('/products/:pid', async(req, res)=> {
    const {pid} = req.params
    console.log(pid)
    await productManager.deleteProduct(pid)
    res.send("producto eliminado")
    const arrayProductosActuales = await productManager.getProducts()
    console.log(arrayProductosActuales)
    socket.io.emit('enviarProductos', {dato : arrayProductosActuales})
})



module.exports = router