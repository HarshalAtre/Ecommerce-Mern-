const express=require('express');
const { isAuthtenticate, AuthorizeRole } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controller/order_Controller');
const router=express.Router();


router.route("/order/new").post(isAuthtenticate,newOrder)
router.route("/order/:id").get(isAuthtenticate,getSingleOrder)
router.route("/orders/me").get(isAuthtenticate,myOrders)

router.route("/admin/orders").get(isAuthtenticate,AuthorizeRole("admin"),getAllOrders)
router.route("/admin/order/:id").put(isAuthtenticate,AuthorizeRole("admin"),updateOrder).delete(isAuthtenticate,AuthorizeRole("admin"),deleteOrder)


module.exports=router;