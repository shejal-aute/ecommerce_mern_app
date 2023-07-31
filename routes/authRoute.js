import express from 'express'
import {registerController} from '../controllers/authController.js';
import {loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getAllOrdersController,
  orderStatusController
} from '../controllers/authController.js';
import {requireSignIn ,isAdmin } from "../middlewares/authMiddleware.js";
//router object
const router =express.Router()

//routing 
//register ||method post
router.post('/register',registerController)
 //login ||POST
 router.post('/login',loginController)

 //forgot password
   router.post('/forgot-password',forgotPasswordController)

 //test route
 router.get("/test",requireSignIn,isAdmin,testController);

 //protected route -user route
 router.get('/user-auth',requireSignIn, (req,res)=>{
    res.status(200).send({ok:true});
 });

 //protected route admin-auth
 router.get('/admin-auth',requireSignIn,isAdmin, (req,res)=>{
  res.status(200).send({ok:true});
});

  //update profile 
  router.put('/profile',requireSignIn,updateProfileController);

  //orders
  router.get('/orders',requireSignIn,getAllOrdersController);

  //order status update
  router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)
export default router
