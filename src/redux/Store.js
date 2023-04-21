import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './slice/UserSlice'
import OrderReducer from './slice/OrderSlice'

export default configureStore({
    reducer: {
        User: UserReducer,
        Order: OrderReducer,
    },
    devTools: false
})