const Product=require("../models/ProductModel")
const CatchAsyncError=require("../middleware/catchAsycerror")
const Order=require("../models/orderModel")
//crete order 
exports.newOrder=CatchAsyncError(async(req,res,next)=>{
    const{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body
   
  console.log(req.body)
    const order=await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    console.log(order)
    res.status(201).json({
        success:true,
        order
    })
})
//get single order
exports.getSingleOrder=CatchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email") //populate is used to get the data of the user, which we refrenced

    if(!order){
        return next(new ErrorHandler("Order not found with this Id",404))
    }
    res.status(200).json({
        
        success:true,
        order
    })
})
// get my orders
exports.myOrders=CatchAsyncError(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id})// gets all order with id of logged in user

    res.status(200).json({
        
        success:true,
        orders
    })
})

// get all orders --admin
exports.getAllOrders=CatchAsyncError(async(req,res,next)=>{
    const orders=await Order.find()

    let totalAmount=0
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        
        success:true,
        totalAmount,
        orders
    })
})

// update order status --admin
exports.updateOrder = CatchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    // console.log(order);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found with this Id"
        });
    }

    if (order.orderStatus === "Delivered") {
        return res.status(400).json({
            success: false,
            message: "You have already delivered this order"
        });
    }

    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product_id, o.quantity);
        });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    
    res.status(200).json({
        success: true,
        message: "Order Updated"
    });
});


// delete order --admin
exports.deleteOrder=CatchAsyncError(async(req,res,next)=>{
    const order= await Order.findById(req.params.id)
    if(!order){
        res.status(404).json({
            success:false,
            message:"Order not found with this Id"
        })
  }
    
    await order.deleteOne()
    
    res.status(200).json({
        success:true,
        message:"Order Deleted Successfully"
    })
})

async function updateStock(id,quantity){
    const product=await Product.findById(id)
    console.log(product)
    product.Stock-=quantity

    await product.save({validateBeforeSave:false})
}