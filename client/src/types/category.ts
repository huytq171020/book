export interface PaginatedCategory {
    docs: CategoryType[];
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

export interface CategoryType {
    _id: string;
    name: string;
    thumbnail: string;
}