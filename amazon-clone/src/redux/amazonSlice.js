import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    userInfo: null
}
export const amazonSlice = createSlice({
    name: 'amazon',
    initialState,
    reducers: {
        addtoCart: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },
        incrementquantity: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload)
            item.quantity++;
        },
        decrementquantity: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload)
            if (item.quantity == 1) {
                item.quantity = 1
            } else {
                item.quantity--
            }
        },
        deleteitem: (state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload)
        },
        resetItem: (state) => {
            state.products = []
        },
        // user authentation
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        userSignout:(state)=>{
            state.userInfo = null
        }
    }
})

export const { addtoCart, deleteitem, resetItem, incrementquantity, decrementquantity,setUserInfo,userSignout} = amazonSlice.actions;
export default amazonSlice.reducer;