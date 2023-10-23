import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { brainTreePaymentController, brainTreeTokenController, createProductController, deleteProduct, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchController, updateProductController } from "../controllers/productController.js";
import formidable from 'express-formidable';
const router = express.Router();

//Routes

// create product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// All products
router.get('/get-product', getProductController);

//single product
router.get('/get-product/:slug', getSingleProductController);

// Get Photo
router.get("/product-photo/:pid", productPhotoController);


//delete product 
router.delete("/delete-product/:pid", deleteProduct);

// filter product
router.post("/product-filter", productFiltersController);


//product Count
router.get('/product-count', productCountController);


//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchController);

//simillar product
router.get('/related-product/:pid/:cid', relatedProductController);

// category wise product
router.get("/product-category/:slug", productCategoryController);


// Payment Routes
router.get('/braintree/token', brainTreeTokenController);

// Payments
router.post('/braintree/payment', requireSignIn, brainTreePaymentController);

export default router;