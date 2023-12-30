const {Server:ServerIO} = require('socket.io')

const io = new ServerIO()

module.exports = {io}