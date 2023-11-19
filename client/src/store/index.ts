import authApi from '@/services/auth';
import categoryApi from '@/services/category';
import commentApi from '@/services/comment';
import { favouriteapi } from '@/services/favourite';
import optionApi from '@/services/option';
import orderApi from '@/services/order';
import productApi from '@/services/product';
import userApi from '@/services/user';
import { cartReducer } from '@/slices/cart';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};
const rootReducer = combineReducers({
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [optionApi.reducerPath]: optionApi.reducer,
    [favouriteapi.reducerPath]: favouriteapi.reducer,



});

// Middleware
const middleware: any[] = [
    authApi.middleware,
    productApi.middleware,
    categoryApi.middleware,
    orderApi.middleware,
    commentApi.middleware,
    userApi.middleware,
    optionApi.middleware,
    favouriteapi.middleware
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(...middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default persistStore(store);
