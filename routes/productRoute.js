import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController,
     getProductController,
      getSingleProductController ,
      getProductPhotoController,
      deleteProductController,
      updateProductController,
      productFiltersController,
      productCountController,
      productListController,
      searchProductController,
      relatedProductController,
      productCategoryController,
      brainTreePaymentController,
      braintreeTokenController
    } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router =express.Router()

//routes
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController);

//get all products
router.get('/get-product',getProductController)

//get single product
router.get('/get-product/:slug',getSingleProductController)

//get photo
router.get('/product-photo/:pid',getProductPhotoController)

//delete product
router.delete('/delete-product/:pid',deleteProductController);

//update product
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController);

//filterproducts
router.post('/product-filters',productFiltersController)

//count products
router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page',productListController);

//search product
router.get('/search/:keyword',searchProductController)

//similar products
router.get('/related-product/:pid/:cid',relatedProductController);

//category wise product
router.get('/product-category/:slug',productCategoryController);

//payment gateway
//getting token
router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)


export default router