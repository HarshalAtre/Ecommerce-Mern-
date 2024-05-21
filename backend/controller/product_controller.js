const Product=require("../models/ProductModel")

//Create products--Admin
exports.createProduct = async(req, res) => {
    const product = await Product.create(req.body)
    res.status(200).json("Products")
}

//Update Products--Admin
exports.updateProduct = async(req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json("Product not found")
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(product)
}
//Delete product--Admin

exports.DeleteProduct=async(req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json("Product not found")
    }
    await product.deleteOne()
    res.status(200).json("Product deleted")
}
//Get product Details
exports.getProductDetails= async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json("Product not found")
    }
    res.status(200).json(product)
}
//Get All products
exports.getAllproducts = async(req, res) => {
    const products=await Product.find()
    res.status(200).json(products)
}
