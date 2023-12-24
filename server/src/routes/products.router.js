const path = require('path')
const ProductManager = require('../../../ProductManager/productManager.js')
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

const productFilePath = path.resolve(__dirname, '../../data/products.json')

let productManager = new ProductManager(productFilePath)

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())


router.get('/products', async (req, res)=>{
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

router.get('/products/:pid', async (req, res)=>{
    const {pid} = req.params
    let products = await productManager.getProductBtId(pid)
    res.json(products)
})

router.post('/products', async (req,res)=>{
    const productoRecibido = req.body
    await productManager.addProdcut(productoRecibido)
    res.send(productManager.estadoPeticion)
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
})

router.delete('/products/:pid', async(req, res)=> {
    const {pid} = req.params
    productManager.deleteProduct(pid)
    res.send("producto eliminado")
})


module.exports = router