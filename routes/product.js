const express=require("express");
const router=express.Router();

const {getProductById,
    createProduct,
    getProduct,
    image,deleteProduct,
    updateProduct,
    getAllProducts,
    getAllUniqueCategories
}=require("../controllers/product");
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/authentication");
const {getUserById}=require("../controllers/user");
//param
router.param("userId", getUserById);
router.param("productId", getProductById);
//routes
//create routes
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);
//read routes
router.get("/product/:productId",getProduct)
router.get("/product/image/:productId",image);
//delete route
router.delete("/product/:productId/:userId", isSignedIn,isAuthenticated,isAdmin,deleteProduct)
//update route
router.put("/product/:productId/:userId", isSignedIn,isAuthenticated,isAdmin,updateProduct)
//listing route
router.get("/products",getAllProducts)
router.get("/products/categories", getAllUniqueCategories)
module.exports=router;