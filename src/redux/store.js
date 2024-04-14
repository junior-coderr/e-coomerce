import { configureStore} from '@reduxjs/toolkit'
import productSlice from './slices/productSlice'
import scrollSlice from './slices/scrollSlice'
import likedSlice from './slices/liked'

const store =configureStore({
    reducer:{
        products: productSlice,
        scroll:scrollSlice,
        liked:likedSlice
    }
})

export default store
