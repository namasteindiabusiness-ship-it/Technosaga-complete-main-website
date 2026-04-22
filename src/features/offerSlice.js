import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coupon: {},
    offerShow: true
}

const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
        offerHide: (state, action) => {
            state.offerShow = false
        },
        couponData: (state, action) => {
            state.coupon = action.payload
        }
    }
})
export const { offerHide, couponData } = offerSlice.actions
export const offerStatus = (state) => state.offer.offerShow
export const activeCoupon = (state) => state.offer.coupon

export default offerSlice.reducer