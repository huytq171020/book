export interface PaginatedProduct {
    docs: ProductType[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: null;
    pagingCounter: number;
    prevPage: null;
    totalDocs: number;
    totalPages: number;
    _page?: number;
    _limit?: number;
  _search?: string;
}

export interface ProductType {
    _id: string;
    name: string;
    price: number;
    sale_off: number;
    description: string;
    quantity: number;
  

    images: string[];
    createAt:Date;
    updateAt:Date;
    categoryId?: Category;
    
}

export type ExtendProduct = ProductType & {
  
    categoryId?: Category;
}


interface Category {
    _id:string;
    name:string;
}

  