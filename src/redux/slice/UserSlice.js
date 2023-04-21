import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        value: null
    },
    reducers: {
        setUser: (state, action) =>{
            state.value = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions

export default userSlice.reducer