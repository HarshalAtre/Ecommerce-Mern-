const express=require('express');
const { getAllproducts, createProduct, updateProduct, DeleteProduct, getProductDetails } = require('../controller/product_controller');
const { isAuthtenticate } = require('../middleware/auth');
const router=express.Router();

router.route("/products").get(getAllproducts)
router.route("/product/new").post(isAuthtenticate,createProduct)
router.route("/product/:id")
.put(isAuthtenticate,updateProduct) 
.delete(isAuthtenticate,DeleteProduct)
.get(getProductDetails)
module.exports=router;