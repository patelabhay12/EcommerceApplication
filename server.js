import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './router/authRoute.js';
import categoryRoutes from './router/categoryRoutes.js';
import productRoutes from './router/productRoutes.js';
import cors from 'cors';

// congigure env
dotenv.config();

// database config ]
connectDB();

// rest object
const app = express();


// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//Routers
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);


// rest api
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to ecomm web"
    })
});

//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
    console.log(`server Running on ${PORT}`);
})
