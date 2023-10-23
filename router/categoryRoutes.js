import express from "express";
import {requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'
import { categoryController, createCategory, deleteCategoryController, singleCategoryController, updateCategory } from "../controllers/categoryController.js";

const router = express.Router();

//routes

//create category
router.post('/create-category', requireSignIn, isAdmin, createCategory);

//update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategory);

// get all Category
router.get('/get-category', categoryController);

//single category
router.get('/single-category/:slug', singleCategoryController);

// delete Category

router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

export default router;                 