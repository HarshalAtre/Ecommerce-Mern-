const Product=require("../models/ProductModel")
const CatchAsyncError=require("../middleware/catchAsycerror")
const ApiFeatures = require("../utils/Apifeatures")
//Create products--Admin
exports.createProduct = CatchAsyncError(async(req, res) => {
    req.body.user=req.user.id//setting user in body so that while creating product we have user:req.user.id and ref is set to "user"
    const product = await Product.create(req.body)
    res.status(200).json("Products")
})

//Update Products--Admin
exports.updateProduct =CatchAsyncError( async(req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json("Product not found")
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(product)
})
//Delete product--Admin

exports.DeleteProduct= CatchAsyncError(async(req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json("Product not found")
    }
    await product.deleteOne()
    res.status(200).json("Product deleted")
})
//Get product Details
exports.getProductDetails= CatchAsyncError(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json("Product not found")
    }
    res.status(200).json(product)
})
//Get All products
exports.getAllproducts =CatchAsyncError( async(req, res) => {
    const resultPerPage = 5
    const apifeatures= new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage) //givig output of functions in Apifeature class
    const products=await apifeatures.query
    res.status(200).json(products)
})

