export interface PaginatedUser {
    docs: UserType[];
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

export interface UserType {
    _id: string;
    address: string;
    email: string;
    favourite: any[];
    firstName: string;
    lastName: string;
    phone: number;
    role: string;
    username: string;
    password:string;
}