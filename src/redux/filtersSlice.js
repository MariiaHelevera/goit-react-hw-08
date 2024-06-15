import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        name: ""
    },
    reducers: {
        changeFilter(state, action) {
            state.name = action.payload;
        }
    }
})

export const { changeFilter }  = filtersSlice.actions;

export const selectFilters = state => state.filters.name;

export default filtersSlice.reducer;