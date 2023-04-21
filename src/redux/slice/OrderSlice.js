import {createSlice} from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'Order',
    initialState: {
        value: []
    },
    reducers: {
        setOrder: (state, action) =>{
            state.value = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const {setOrder} = orderSlice.actions

export default orderSlice.reducer