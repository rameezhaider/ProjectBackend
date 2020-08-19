const User=require("../models/user");
const { check,validationResult }=require('express-validator');
var jwt=require('jsonwebtoken');
var eJwt=require('express-jwt');

exports.signup=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const user=new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to save user in DB" // unify the fields in response. err !== error
            })
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        });
    })
};
exports.signin=(req,res)=>{
    const errors=validationResult(req);
    const {email, password}=req.body;
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User doesn't exists"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password doesn't match"
            })
        }
        //Create Token
        const token=jwt.sign({_id:user._id},process.env.SECMSG)
        //Put Token In Cookies
        res.cookie("token",token,{expire:new Date()+9999}); // TODO: Make tokens that expire earlier than 9999. Study refreshTokens
        //Send Response to FrontEnd
        const {_id,name,email,role}=user;
        return res.json({token, user:{_id,name,email,role}})
    })
};
exports.signout=(req,res) =>{
    res.clearCookie("token");
    res.json({
        message:"User Signout Successfully"
    })};
//Protected Routes
exports.isSignedIn= eJwt({
    secret:process.env.SECMSG,
    userProperty:"auth"
});
//Custom Middlewares
exports.isAuthenticated=(req,res,next)=>{
    let checker=req.profile&&req.auth&&req.profile._id==req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"Access Denied"
        })
    }
    next();
}
exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            error:"Access Denied"
        })
    }
    next();
}