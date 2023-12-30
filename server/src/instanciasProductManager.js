const ProductManager = require('../../ProductManager/productManager.js')
const path = require('path')

const productFilePath = path.resolve(__dirname, '../data/products.json')

const productManager = new ProductManager(productFilePath)

module.exports = productManager