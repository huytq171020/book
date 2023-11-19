import { Rate } from 'antd';
import { FunctionComponent, useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import SaleOffCard from '../ui/SaleOffCard';
import { ProductType } from '@/types/Product';
import { useAppDispatch } from '@/store/hook';
import { addToCart } from '@/slices/cart';
import { useAddToWishlistMutation } from '@/services/favourite';
import { useMeQuery } from '@/services/auth';
import { toast } from 'react-toastify';

interface ProductItemProps {
    arrangeList?: boolean;
    product?: ProductType;
}
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ProductItem: FunctionComponent<ProductItemProps> = ({ arrangeList, product }) => {
    const dispatch = useAppDispatch();
    const { data: authData } = useMeQuery();

    const [value, setValue] = useState(3);
    const [loading, _setLoading] = useState(false);
    const hasSale = (product?.price!) - ((product?.price! * product?.sale_off!) / 100)

    //favourite product
    const [addToWishlist] = useAddToWishlistMutation();
    const handleAddToWishlist = (productId: any, user_id: any) => {
        if (authData) {
            if (addToWishlist) {
                setTimeout(() => {
                    addToWishlist({ product_id: productId, user_id: authData._id });
                    toast.success('Thêm sản phẩm yêu thích thành công', { position: 'top-right' });
                }, 500);
            } else {
            }
        } else {
            toast.warning('Bạn chưa đăng nhập !', { position: 'top-right' });
        }
    };

    return (
        <>
            {loading ? (
                <div>
                    <Skeleton className="h-[260px]" />
                    <Skeleton count={4} />
                </div>
            ) : !arrangeList ? (
                <div className="shadow-sm">
                    <div className="relative group ">

                        <div className="favourite hidden group-hover:block ">

                            <div
                                onClick={() => handleAddToWishlist(product?._id, authData?._id)}
                                className="absolute left-0 z-10 text-xl font-semibold flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11 "
                            >
                                <AiOutlineHeart />
                            </div>

                        </div>
                        <Link to={`/detail/${product?._id}`} className="">
                            <img
                                src={product?.images[0]}
                                alt={product?.name}
                                className="object-cover w-full mx-auto h-40 md:h-80 lg:h-60"
                            />
                        </Link>

                        {/* Card sale off if saleoff > 0 */}
                        <SaleOffCard type="saleoff" off={product?.sale_off ?? 0} />

                        <div className="flex justify-center">
                            <div
                                onClick={() =>
                                    dispatch(
                                        addToCart({
                                            ...product!,
                                            price: hasSale,
                                            quantity: 1,
                                        })
                                    )
                                }
                                className="absolute z-10 text-xl font-semibold flex items-center justify-center p-2 -mt-6 text-center text-primary/90 border rounded-full shadow-xl cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 hover:text-gray-50 hover:bg-primary/95 w-11 h-11"
                            >
                                <AiOutlineShoppingCart />
                            </div>
                        </div>

                    </div>

                    <div className="py-6 text-left">
                        <h3 className="text-center mt-4 h-[50px] text-sm lg:text-base line-clamp-2 font-normal">
                            <Link to={`/detail/${product?._id!}`}>{product?.name}</Link>
                        </h3>
                        <p className="mb-3 text-lg font-medium text-center text-gray-600">
                            <span className="text-primary/90 dark:text-gray-300 text-sm lg:text-xl">
                                ${product?.price}
                            </span>
                            {product?.sale_off! > 0 && (
                                <span className="ml-2 text-gray-400 line-through text-sm lg:text-xl">
                                    ${hasSale}
                                </span>
                            )}
                        </p>
                        <div className="flex justify-center">
                            <span>
                                <Rate className="text-sm" tooltips={desc} onChange={setValue} value={value} />
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 border border-gray-200 rounded-md bg-gray-50 dark:border-gray-900 rounded-b-md dark:bg-gray-900">
                    <div className="relative">
                        <Link to={''} className="">
                            <img
                                src={product?.images[0]}
                                alt={product?.name}
                                className="object-cover w-full mx-auto h-32 md:h-80 lg:h-52"
                            />
                        </Link>
                        <SaleOffCard type="saleoff" off={0} />
                    </div>
                    <div className="px-6 py-0 md:py-6 lg:py-6">
                        <h3 className="mb-3 mt-3 text-base lg:text-xl line-clamp-2 font-medium text-center">
                            <Link to={''}> {product?.name}</Link>
                        </h3>
                        <p className="mb-3 text-lg font-medium text-center text-gray-600">
                            <span className="text-primary/90 dark:text-gray-300 text-sm lg:text-xl">
                                ${hasSale}
                            </span>
                            {product?.sale_off! > 0 && (
                                <span className="ml-2 text-gray-400 line-through text-sm lg:text-xl">
                                    ${product?.price}
                                </span>
                            )}
                        </p>
                        <div className="flex justify-center">
                            <span>
                                <Rate
                                    className="text-sm md:text-base lg:text-xl"
                                    tooltips={desc}
                                    onChange={setValue}
                                    value={value}
                                />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() =>
                            dispatch(
                                addToCart({
                                    ...product!,
                                    quantity: 1,

                                }),
                            )
                        }
                        className="flex w-full col-span-2 text-sm md:text-base lg:text-xl justify-center px-4 py-2 text-primary/90 border border-primary/90 items-center dark:border-gray-600 hover:bg-primary/90 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900"
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            )}
        </>
    );
};

export default ProductItem;
