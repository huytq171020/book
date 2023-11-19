import { ProductType } from '@/types/Product';
import { FunctionComponent } from 'react';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '@/services/product';
import Skeleton from 'react-loading-skeleton';

interface ListProductItemsProps {
    heading?: string;
    hostProducts?: ProductType[];
}

const ListProductItems: FunctionComponent<ListProductItemsProps> = ({ heading }) => {
    const { data, isLoading } = useGetProductsQuery();

    return (
        <section className="flex items-center font-poppins">
            <div className="justify-center flex-1 max-w-5xl px-0 py-4 mx-auto lg:py-8 md:px-4">
                <h2 className="pb-2 uppercase text-xl font-semibold text-left text-gray-800 md:text-3xl dark:text-gray-400">
                    {heading}
                </h2>
                <div className="w-20 mb-6 border-b border-red-700 dark:border-gray-400"></div>
                {isLoading ? (
                    <div className="grid gap-4 mb-11 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                        {[...new Array(8)].map((_item, index) => (
                            <div key={index}>
                                <Skeleton className="h-[170px] w-full" />
                                <Skeleton count={3} className="h-[42px]" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-2 mb-11 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                        {data?.docs.map((product) => (
                            <ProductItem key={product._id} product={product} />
                        ))}
                    </div>
                )}

                <div className="flex justify-center">
                    <Link
                        to="/filter"
                        className="px-4 py-1 border border-primary/90 hover:bg-primary/90 text-primary/90 hover:text-white rounded bg-transparent"
                        style={{
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            borderRadius: '4px',
                            borderColor: '#1890ff',
                            color: '#1890ff',
                            padding: '8px 16px',
                            transition: 'background-color 0.3s, color 0.3s',
                        }}
                    >
                        Xem thêm
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ListProductItems;
