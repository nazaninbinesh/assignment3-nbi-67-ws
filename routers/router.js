var express = require('express')
var getRouter = express.Router()
var postRouter = express.Router()
var deleteRouter = express.Router()
var checkoutRouter = express.Router()


var controller = require('../controllers/controller.js')


getRouter.get('/', controller.getInventory)
postRouter.post('/', controller.addItemNbi67)
deleteRouter.delete('/', controller.removeItemNbi67);
checkoutRouter.post('/', controller.checkout);

module.exports = {
    getRouter,
    postRouter,
    deleteRouter,
    checkoutRouter
}

