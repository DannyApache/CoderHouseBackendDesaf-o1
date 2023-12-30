const CartManager = require('../../ProductManager/cartsManager.js')
const path = require('path')

const cartFilePath = path.resolve(__dirname, '../data/carts.json')

const cartManager = new CartManager(cartFilePath)

module.exports = cartManager