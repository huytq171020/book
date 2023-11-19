import { Checkbox, List } from 'antd';
import { FunctionComponent, useState } from 'react';
import { useGetProductsQuery } from '@/services/product';
import { useGetCategoriesQuery } from '@/services/category';
import Loading from '@/components/ui/Loading';
import ProductItem from '@/components/products/ProductItem';

interface FilterProductsProps { }

const FilterProducts: FunctionComponent<FilterProductsProps> = () => {
    const { data: productsData, isLoading: isLoadingProducts } = useGetProductsQuery();
    const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryChange = (category: string) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(updatedCategories);
    };

    const filteredProducts = productsData?.docs.filter((product) => {
        return selectedCategories.length === 0 || selectedCategories.includes(product.categoryId._id);
    });

    return (
        <section className="py-6 min-h-screen bg-gray-50 font-poppins dark:bg-gray-800 ">
            {(isLoadingProducts || isLoadingCategories) ? (
                <Loading />
            ) : (
                <div className="px-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap mx-auto mb-24">
                        <div className="w-full lg:w-1/6 lg:block">
                            <div className="bg-white text-lg p-2 shadow-sm">
                                <div className='overflow-y-auto max-h-[280px] relative'>
                                    <h1 className='sticky bg-white h-[30px] z-50 top-0 left-0'>Danh mục</h1>
                                    <List>
                                        {categoriesData?.docs.map((category) => (
                                            <List.Item key={category._id}>
                                                <Checkbox
                                                    onChange={() => handleCategoryChange(category._id)}
                                                    checked={selectedCategories.includes(category._id)}
                                                >
                                                    {category.name}
                                                </Checkbox>
                                            </List.Item>
                                        ))}
                                    </List>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-3/4 flex-1">
                            <div className={`grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 items-center px-2`}>
                                {filteredProducts?.map((product) => (
                                    <div key={product._id} className="w-full mb-6">
                                        <ProductItem product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FilterProducts;
