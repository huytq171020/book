import { PaginatedOrder } from '@/types/order';
import { IOrder } from '@/types/order';
import { waiting } from '@/utils/waiting';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const orderApi = createApi({
  reducerPath: "order",
  tagTypes: ['Order'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    fetchFn: async (...arg) => {
      await waiting(2000);
      return fetch(...arg)
    }
  }),


  endpoints: (builder) => ({

    getRevenueStatistics: builder.query<{ totalRevenue: number }, void>({
      query: () => ({
        url: '/orders',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Order'],
    }),
    getsOrder: builder.query<PaginatedOrder, void>({
      query: () => '/order',
      providesTags: ['Order'],
    }),
    getProductById: builder.query<IOrder, string>({
      query: (_id) => `/order/${_id}`,
      providesTags: ['Order']
    }),
    createOrder: builder.mutation<IOrder, IOrder>({
      query: (order) => ({
        url: '/order',
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['Order']
    }),
    updateOrderStatus: builder.mutation<IOrder, { orderId: string, status: number }>({
      query: ({ orderId, status }) => ({
        url: `/order/${orderId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
    getOrderById: builder.query<IOrder, string>({
      query: (record) => `/order/${record}`,
      providesTags: ['Order'],
    }),
  }),

})
export const { useGetsOrderQuery, useGetProductByIdQuery, useCreateOrderMutation, useUpdateOrderStatusMutation, useGetRevenueStatisticsQuery ,useGetOrderByIdQuery} = orderApi
export default orderApi
