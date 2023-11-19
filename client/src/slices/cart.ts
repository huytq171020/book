import { ExtendProduct, ProductType } from '@/types/Product';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

type CartProps = {
    cartItems: any[];
};

const initialState: CartProps = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ExtendProduct>) => {
            const newProduct = action.payload;

            const existingProduct = state.cartItems.findIndex((item) => item._id === newProduct._id);

            if (existingProduct === -1) {
                state.cartItems.push(newProduct);

                toast.success(`Đã thêm ${newProduct.name} vào giỏ hàng`, {
                    position: 'bottom-right',
                });
            } else {

                toast.info(`${newProduct.name} đã có trong giỏ hàng`, {
                    position: 'bottom-right',
                });
                // state.cartItems[existingProduct].quantity = newProduct.quantity++ || newProduct.quantity;
                // state.cartItems[existingProduct].colorId = newProduct.colorId?.name!;
                // state.cartItems[existingProduct].sizeid = newProduct.sizeId?.name!;
            }

           
        },
        increase: (state, action: PayloadAction<ProductType>) => {
            const currentProduct = state.cartItems.find((item) => item._id === action.payload);
            currentProduct.quantity++;
        },
        decrease: (state, action: PayloadAction<ProductType>) => {
            const currentProduct = state.cartItems.find((item) => item._id === action.payload);
            currentProduct.quantity--;

            if (currentProduct.quantity < 1) {
                state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
                currentProduct.quantity = 1;
                toast.info(`Đã xóa khỏi giỏ hàng`, {
                    position: 'bottom-right',
                });
            }
        },
        remove: (state, action: PayloadAction<ProductType>) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);

            toast.info(`Đã xóa khỏi giỏ hàng`, {
                position: 'bottom-right',
            });
        },
        clear: (state) => {
            state.cartItems = [];
            toast.info(`Giỏ hàng đã được dọn sạch`, {
                position: 'bottom-right',
            });
        },
    },
});

export const { addToCart, increase, decrease, clear, remove } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
