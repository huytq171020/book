import AdminLayout from '@/components/layout/AdminLayout';
import MainLayout from '@/components/layout/MainLayout';

import Dashbroad from '@/pages/admin/dashbroad';
import ListCaegory from '@/pages/admin/category/listCategory';

import AccountDetail from '@/pages/user/account-detail/AccountDetail';

import Cart from '@/pages/user/cart/Cart';
import FilterProducts from '@/pages/user/filter/FilterProducts';
import Home from '@/pages/user/home/Home';
import ProductDetail from '@/pages/user/productdetail/ProductDetail';
import Signin from '@/pages/user/signin';
import Signup from '@/pages/user/signup';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import ListUser from '@/pages/admin/user/listUser';
import AppTest from '@/pages/admin/category/test';
import ListOrder from '@/pages/admin/order/listorder';
import ListProduct from '@/pages/admin/product/listProduct';
import Error from '@/pages/error/Error';
import LocationList from '@/pages/user/checkout/Checkout';
import UpdateUser from '@/pages/admin/user/updateUser';
import ForgotPassword from '@/pages/user/forgot-password/ForgotPassword';
import ChangePassword from '@/pages/user/change-password/ChangePassword';
import ListComment from '@/pages/admin/product/listComment';
import YourFavourite from '@/pages/user/your-favourite';
import OrderSumeries from '@/pages/user/orders/OrderSumeries';
import CheckoutSuccess from '@/pages/user/success/CheckoutSuccess';
import CancelCheckout from '@/pages/user/cancelled/CancelCheckout';

const router = createBrowserRouter([
    // Main layout
    {
        path: '/404',
        element: <Error />,
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'filter',
                element: <FilterProducts />,
            },
            {
                path: 'detail/:id',
                element: <ProductDetail />,
            },
            {
                path: 'checkout',
                element: <LocationList />,
            },
            {
                path: 'your-favorite',
                element: <YourFavourite />,
            }, {
                path: 'orders/:userId',
                element: <OrderSumeries/>
            }
        ],
    },
    {
        path: '/account',
        children: [
            {
                path: 'signup',
                element: <Signup />,
            },
            {
                path: 'signin',
                element: <Signin />,
            },
            {
                path: 'details',
                element: <AccountDetail />,
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword/>
            },
            {
                path: 'change-password',
                element: <ChangePassword/>
            },
            
        ],
    },

    {
        path: 'success/:id',
        element: <CheckoutSuccess />,
    },
    {
        path: 'cancelled/:id',
        element: <CancelCheckout/>
    },
    // Admin
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" />,
            },
            { path: 'dashboard', element: <Dashbroad /> },
            { path: 'product', element: <ListProduct /> },
            { path: 'category', element: <ListCaegory /> },
            { path: 'user', element: <ListUser /> },
            { path: 'user/update/:id', element: <UpdateUser /> },
            { path: 'test', element: <AppTest /> },
            { path: 'order', element: <ListOrder /> },
            { path: 'product/:id/comments', element: <ListComment /> },
        ],
    },
]);

export default router;
