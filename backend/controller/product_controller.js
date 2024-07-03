const Product=require("../models/ProductModel")
const CatchAsyncError=require("../middleware/catchAsycerror")
const ApiFeatures = require("../utils/Apifeatures")
const { response } = require("express")
const cloudinary = require("cloudinary")
//Create products--Admin
exports.createProduct=CatchAsyncError(async (req,res,next) =>{
  console.log(req.body.original_names)
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({ 
        public_id: result.public_id,
        url: result.secure_url,
        
      });
    }
     
    req.body.images = imagesLinks;
  
  
      req.body.user=req.user.id;
      const product=await Product.create(req.body);
      res.status(201).json({
          success:true,
          product
      })
  })

// Update Products--Admin
exports.updateProduct = CatchAsyncError(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json("Product not found");
    }
  
    // Images Start Here
    let images = [];
  
    // Flatten the array if it contains nested arrays
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else if (Array.isArray(req.body.images)) {
      images = req.body.images.flat();
    }
  
    if (images.length > 0) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
  
      const imagesLinks = [];
  
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      req.body.images = imagesLinks;
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  
    res.status(201).json({
      success: true,
      product,
    });
  });
  
  
//Delete product--Admin

exports.DeleteProduct= CatchAsyncError(async(req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json("Product not found")
    }
    //delete images from cloudnary
    for (let i = 0; i < product.images.length; i++) {
      
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }
    await product.deleteOne()
    res.status(200).json({
        success: true,
    })
})
//Get product Details
exports.getProductDetails= CatchAsyncError(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json("Product not found")
    }
    res.status(200).json(product)
})
// Get All products
exports.getAllproducts =CatchAsyncError( async(req, res) => {

    const resultPerPage = 16
    const productsCount = await Product.countDocuments()
    const apifeatures= new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage) //giving output of functions in Apifeature class
    
    const filteredProductCount = await Product.countDocuments(apifeatures.query)//counting the number of products after applying filter
    let products=await apifeatures.query
 
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductCount
    })
})
// Get All products (Admin)
exports.getAdminproducts =CatchAsyncError( async(req, res) => {
    const products = await Product.find()
 
    res.status(200).json({
        success: true,
        products,
    })
})

// Create or Update Review
exports.createOrUpdateReview = CatchAsyncError(async (req, res, next) => {

  
      const { rating, comment, productid } = req.body;
    
      const review = {
          user: req.user._id,
          name: req.user.name,
          rating: Number(rating),
          comment,
      }
      const product = await Product.findById(productid)
         
      let isReviewed = product.reviews.find(// reviews is array , this is like forEach method but is finding too
          (rev) => rev.user.toString() === req.user._id.toString() // checking if the user has already reviewed the product by checking user id 
          // which is in review.user (check schema)
      )
      
      if (isReviewed) {// already reviewed then
          product.reviews.forEach((rev) => {//itreating over all reviews 
              if (rev.user.toString() === req.user._id.toString())// and updating the review of the login user only , by given rating and comment
              (rev.rating = rating), (rev.comment = comment)
          });
      }
  
      else { // Else if the user has not reviewed the product yet , pusing the review in reviews array
          product.reviews.push(review);
          product.numOfReviews = product.reviews.length // updating number of reviews as new review is added
      }
  
      let avg = 0;
      
      product.reviews.forEach((rev) => {
          avg += rev.rating
  
      })
      
      product.ratings = avg / product.reviews.length // udating ratings by calculating avg
      
      await product.save({ validateBeforeSave: false });
      
      res.status(200).json({
          success: true,
      })
  
  })
  
  // get all reviews of a product
  exports.getProductReviews = CatchAsyncError(async (req, res, next) => {
     const product = await Product.findById(req.query.id)
      
      if (!product) {
          return next(
            res.status(404).json({
              success: false,
              message: "Product not found",
            })
          );
     }
     const reviews = product.reviews
     res.status(200).json({
         success: true,
         reviews
     })
  })
  
  // delete a review of a product
  exports.deleteReview = CatchAsyncError(async (req, res, next) => {
      const product = await Product.findById(req.query.productId)
      
      if(!product){
          return next(
              res.status(404).json({
                  success: false,
                  message: "Product not found",
              })
          );
      }
      console.log(product)
      let reviews = product.reviews
      reviews = reviews.filter((rev)=> rev._id.toString() !== req.query.id.toString()) // filtering the review which is to be deleted,and storing others
      // Now in reviews array we have all the reviews except the one which is to be deleted
      let avg = 0;
      
      reviews.forEach((rev) => {
          avg += rev.rating
      })
      
      let ratings = 0;
  
      if (reviews.length === 0) {
          ratings = 0
      }
      else {
          ratings = avg / reviews.length
      }
  
      const numOfReviews = reviews.length
      
      await Product.findByIdAndUpdate(req.query.productId, {
          reviews,
          ratings,
          numOfReviews
      }, {
          new: true,
          runValidators: true,
          useFindAndModify: false
      })
      res.status(200).json({

          success: true,
          message: "Done",
      })
  })