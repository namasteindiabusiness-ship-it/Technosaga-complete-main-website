import { configureStore } from "@reduxjs/toolkit"
import offerReducer from "../features/offerSlice"

const store = configureStore({
    reducer: {
        offer: offerReducer,
    }
})

export default store