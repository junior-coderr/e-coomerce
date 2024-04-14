import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    liked: [],
};

const likedSlice = createSlice({
    name:'liked',
    initialState,
    reducers:{
        addLiked:(state,action)=>{
            const data = action.payload;
            state.liked.push(data);
        },
        removeLiked:(state,action)=>{
            const data = action.payload;
            state.liked = state.liked.filter((item)=>item!==data);
        }
    }
})

export const { addLiked, removeLiked } = likedSlice.actions;
export default likedSlice.reducer;