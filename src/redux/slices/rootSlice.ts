import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        rank: '1',
        food: "Apple",
        pic: "img",

    },
    reducers: {
        chooseRank: (state, action) => { state.rank = action.payload},
        chooseFood: (state, action) => { state.food = action.payload},
        choosePic: (state, action) => { state.pic = action.payload},

    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseRank, chooseFood, choosePic} = rootSlice.actions;