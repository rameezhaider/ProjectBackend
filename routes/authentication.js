var express = require('express');
var router = express.Router();
const { check,validationResult }=require('express-validator');
const {signout,signup,signin,isSignedIn}=require("../controllers/authentication")

router.post("/signup",[
    check("name","Name should be at least 3 characters").isLength({min:3}),
    check("email","Email is required").isEmail(),
    check("password","Password should be at least 5 character").isLength({min:5})
],signup);

router.post("/signin",[
    check("email","Email is required").isEmail(),
    check("password","Password is required").isLength({min:5})
],signin );
router.get("/signout",signout);

module.exports=router;