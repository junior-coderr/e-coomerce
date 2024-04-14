import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    scroll_elem: undefined,
};


const scrollSlice = createSlice({
    name:'scroll',
    initialState,
    reducers:{
        scrollElement:(state,action)=>{
            state.scroll_elem = action.payload;
        }
    }
})

export const { scrollElement } = scrollSlice.actions;
export default scrollSlice.reducer;