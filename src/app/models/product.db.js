import mongoose from 'mongoose';

const Product_all = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    product_images: {
        type: Array,
        required: true
    },
    product_category: {
        type: String,
        required: true
    },
    product_rating: {
        type: Number,
        required: true
    },
    product_reviews: {
        type: Array,
        required: true
    },
    additional_info: {
        type: Array,
    },
    product_colors: {
        type: Array,
    },
    product_sizes: {
        type: Array,
    },
    liked: {
        type: Boolean,
        required: true
    },

});


const Detailed_product = mongoose.models.Detailed_product || mongoose.model('Detailed_product', Product_all);
export default Detailed_product;