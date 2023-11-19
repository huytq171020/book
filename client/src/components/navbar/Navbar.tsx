import AccountIcon from '../ui/AccountIcon';
import { FunctionComponent, useState } from 'react';
import { AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai';
import Notification from '../ui/Notification';
import CartModal from '../modal/CartModal';
import MobileMenuModal from '../modal/MobileMenuModal';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useGetCategoriesQuery } from '@/services/category';
import WishlistItemsLength from '../modal/wishlistItemsLength ';

interface NavbarProps { }

const Navbar: FunctionComponent<NavbarProps> = () => {
    const { data } = useGetCategoriesQuery();
    const [openAbsolute, setOpenAbsolute] = useState(false);
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="relative h-[75px] shadow fixed-top z-50">
            <section className="absolute w-full  flex-grow left-0 right-0 flex items-center top-0 bottom-0 font-poppins dark:bg-gray-800 bg-gray-50">
                <div className="max-w-5xl px-2 lg:px-4 w-full mx-auto">
                    <nav className="relative flex items-center justify-between py-4 ">
                        <Link to="/" className="hidden  lg:block font-semibold leading-none ">
                           PH22408
                        </Link>
                        <button
                            onClick={showDrawer}
                            className="flex items-center px-3 py-2 text-primary border border-primary rounded hover:text-primary hover:border-blue-300 lg:hidden"
                        >
                            <AiOutlineMenu />
                        </button>

                        <div className="flex items-center lg:hidden ">
                            <div className="mr-5 text-2xl flex">
                                <AiOutlineHeart />
                            </div>
                            <CartModal />
                            <Notification />
                            <AccountIcon />
                        </div>

                        <ul className="hidden lg:w-auto lg:space-x-12 lg:items-center lg:flex ">
                            <li>
                                <Link
                                    to="/"
                                    className="text-sm hover:text-primary dark:hover:text-blue-400"
                                >
                              Home
                                </Link>
                            </li>
                            <li className="relative">
                                <a
                                    onClick={() => setOpenAbsolute(!openAbsolute)}
                                    className="flex items-center cursor-pointer text-sm hover:text-primary dark:hover:text-blue-400"
                                >
                                  category
                                    <span className={`ml-2 text-lg ${openAbsolute ? 'rotate-180' : ''} transition-all`}>
                                        <MdKeyboardArrowDown />
                                    </span>
                                </a>
                                {openAbsolute && (
                                    <div className="absolute z-50 bg-gray-100 text-gray-900 rounded-sm top-10 left-0 right-0 w-[480px] py-2 px-2 shadow-md">
                                        <ul className="grid grid-cols-3">
                                            {data?.docs.map((category) => (
                                                <li
                                                    onClick={() => setOpenAbsolute(false)}
                                                    key={category._id}
                                                    className="line-clamp-1"
                                                >
                                                    <Link
                                                        className="hover:text-primary/90 text-left text-base px-2 py-1 block"
                                                        to={''}
                                                    >
                                                        {category.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li>
                                <Link
                                    to={'/filter'}
                                    className="text-sm text-gray-900 hover:text-primary dark:hover:text-blue-400"
                                >
                                 shop
                                </Link>
                            </li>
                            

                        </ul>
                        <div className="items-center justify-end hidden lg:flex">
                            {/* <div className="mr-5 text-2xl flex relative">
                                <Link to={'your-favorite'}><AiOutlineHeart />
                                    <span className="bg-primary/90 text-white w-5 h-5 flex justify-center items-center rounded-full absolute -top-2 -right-2 text-sm">
                                        1
                                    </span></Link>

                            </div> */}
                            <WishlistItemsLength />
                            <CartModal />
                            <Notification />
                            <AccountIcon />
                        </div>
                    </nav>

                    <MobileMenuModal open={open} onClose={onClose} />
                </div>
            </section>
        </div>
    );
};

export default Navbar;
