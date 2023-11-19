export interface PaginatedOrder {
      docs: IOrder[];
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit: number;
      nextPage: null;
      page: number;
      pagingCounter: number;
      prevPage: null;
      totalDocs: number;
      totalPages: number;
}
interface IProductorder {
      _id?: number | string,
      quantity: number;
      name: string;
      price:number;
   
}
export interface Iuser {
      _id: string;
      email: string;
      fullName: string;
}
export interface IOrder {
      _id: string;
      orderNumber: string;
      status: number;
      phone: number;
      fullName: string;
      shipping: string;
      products: IProductorder[];
      userId: string;
      payMethod: number;
      total: number;
      createdAt: Date;
      updatedAt: Date;
      email: string;
}  