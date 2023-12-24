const express = require('express')
const productos = require('./routes/products.router.js')
const carts = require('./routes/carts.router.js')

const app = express()

const port = 8080

app.use('/api', productos)

app.use('/api', carts)

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})
