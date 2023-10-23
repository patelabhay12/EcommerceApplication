import { registerController, loginController, testController, forgotPasswordController, updateProfileController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// const express = require('express');
import express from 'express';

//Router object
const router = express.Router();


// Routing
// REGISTER || METHOD POST
router.post('/register', registerController);

// LOGIN || PORT
router.post('/login', loginController);

router.post('/forgot-password', forgotPasswordController);

// test routes 
router.get('/test', requireSignIn, isAdmin, testController);


//protected route auth

// userRoute
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// admin route
router.get('/admin-auth', requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

//update profile
router.put('/profile',requireSignIn,updateProfileController);

export default router;
