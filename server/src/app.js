const express = require('express')
const productos = require('./routes/products.router.js')
const carts = require('./routes/carts.router.js')
const handlebars = require('express-handlebars')
const path = require('path')
const socket = require('./socket.js')
const productManager = require('./instanciasProductManager.js')

const app = express()
const port = 8080

// configuracion de handlebars__________________________________________________________
// definicion de ruta de archivos estaticos
const publicPath = path.join(__dirname, '../public')
// configuracion de ruta para llamada de archivos estaticos mediante middleware .static
app.use(express.static(publicPath))
// indicacion a express que se usara handlebars para renderizar las vistas
app.engine('handlebars', handlebars.engine())
// configuracion de ruta views para las vistas
app.set('views', __dirname + '/views')
// definicion de motor usado para las vistas
app.set('view engine', 'handlebars')


const httpServer = app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})

socket.io.attach(httpServer)

socket.io.on('connection', async socketCB=>{
    console.log('cliente conectado')
    arrayProductosActuales = await productManager.getProducts()
    socketCB.emit('enviarProductos', {dato : arrayProductosActuales})
})


// llamada de rutinas routes
app.use('/api', productos)
app.use('/api', carts)

