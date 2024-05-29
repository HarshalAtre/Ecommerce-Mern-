const express=require('express');
const { getAllproducts, createProduct, updateProduct, DeleteProduct, getProductDetails } = require('../controller/product_controller');
const { isAuthtenticate ,AuthorizeRole} = require('../middleware/auth');
const router=express.Router();

router.route("/products").get(getAllproducts)
router.route("/admin/product/new").post(isAuthtenticate,AuthorizeRole("admin"),createProduct)
router.route("/admin/product/:id")
.put(isAuthtenticate,AuthorizeRole("admin"),updateProduct) 
.delete(isAuthtenticate,AuthorizeRole("admin"),DeleteProduct)

router.route("product/:id").get(getProductDetails)
module.exports=router;