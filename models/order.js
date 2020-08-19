const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;
const ProductInCartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number,


})
const ProductInCart= mongoose.model("ProductInCart",ProductInCartSchema)
const orderSchema=new mongoose.Schema({
    products:[ProductInCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address:String,
    status:{
        type: String,
        default: "Received",
        enum: ["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    updated: Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},
{timestamps:true}
);
const Order= mongoose.model("Order",orderSchema)
module.exports={Order,ProductInCart};