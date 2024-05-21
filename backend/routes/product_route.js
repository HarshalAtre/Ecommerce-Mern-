const express=require('express');
const { getAllproducts, createProduct, updateProduct, DeleteProduct, getProductDetails } = require('../controller/product_controller');
const router=express.Router();

router.route("/products").get(getAllproducts)
router.route("/product/new").post(createProduct)
router.route("/product/:id").put(updateProduct).delete(DeleteProduct).get(getProductDetails)
module.exports=router;