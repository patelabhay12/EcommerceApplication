import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    shiping: {
        type: Boolean,
    }
}, { timestamps: true });


export default mongoose.model('Products', productSchema); 