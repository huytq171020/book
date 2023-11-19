import Breadcrumbs from "@/components/breadcrumbs"
import Loading from "@/components/ui/Loading"
import { useMeQuery } from "@/services/auth"
import { Button, Modal } from "antd"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UpdateAccount from "./update-account"
import { useGetWishlistQuery } from "@/services/favourite"

const AccountDetail: React.FC = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);

    const handleAddCategory = () => {
        setOpenAddModal(true);
    };
    const handleModalClose = () => {
        setOpenAddModal(false);
    };

    const router = useNavigate()

    const { data, isLoading } = useMeQuery()
    const { data: authData } = useMeQuery();
    console.log(authData);

    useEffect(() => {
        if (!data) router('/404')
    }, [data])

    const user_id = authData?._id || '';
    const { data: wishlist } = useGetWishlistQuery(user_id);

    const wishlistItems = wishlist?.wishlist_items || [];
    //limit
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 3; // Số sản phẩm hiển thị trên mỗi trang
    const offset = currentPage * perPage;
    const currentPageItems = wishlistItems.slice(offset, offset + perPage);

    return <>
        {!data || isLoading ? <Loading /> : <div>
            <Breadcrumbs />
            <section >
                <Modal title="Cập nhật tài khoản " centered open={openAddModal} onCancel={handleModalClose} footer={null}>
                    <UpdateAccount />
                </Modal>
                <div className="container py-3 p-8">
                    <div className="row d-flex">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                        className="rounded-circle img-fluid w-[150px] ml-24" />
                                    <h5 className="my-3">John Smith</h5>
                                    <p className="text-muted mb-1">Khách hàng mới</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <Button type="primary" className="btn btn-outline-primary ms-1" onClick={handleAddCategory}>
                                            Cập nhật thông tin
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">

                                    <ul className="list-group list-group-flush rounded-3">
                                        <p className="mb-2 list-group-item d-flex justify-content-start align-items-center p-3">Đơn hàng của bạn
                                        </p>
                                        <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                            <i className="fas fa-globe fa-lg text-warning"></i>
                                            <p className="mb-0">Đơn 1 </p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                            <i className="fab fa-github fa-lg" ></i>
                                            <p className="mb-0">Đơn 2</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                            <i className="fab fa-twitter fa-lg" ></i>
                                            <p className="mb-0">Đơn 3</p>
                                        </li>

                                    </ul>
                                    <Link to={'#'} className="text-primary align-items-center font-italic me-1 p-2">Xem thêm</Link>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row p-2">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Họ tên</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{authData?.username}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row p-2">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{authData?.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row p-2">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Số điện thoại</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{authData?.phone}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row p-2">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Địa chỉ</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{authData?.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex">
                                <div className="col-md-5">
                                    <div className="card mb-4 mb-md-0">
                                        <div className="card-body ">
                                            <p className="mb-4"> Sản phẩm yêu thích
                                            </p>

                                            <div className="" >
                                                {currentPageItems.map((item: any) => (
                                                    <div className="p-2">
                                                        <Link to={`/detail/${item.product_id?._id}`}>
                                                            <p className="mb-1" >{item.product_id?.name}</p>
                                                            <div className="bg-slate-50	" >
                                                                <img src={item.product_id?.images[0]} className="w-[80px] p-1" alt="no images" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ))}



                                            </div>
                                            <Link to={'your-favorite'} className="text-primary align-items-center font-italic me-1">Xem thêm</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card mb-4 mb-md-0">
                                        <div className="card-body">
                                            <p className="mb-4"> Sản phẩm ...
                                            </p>
                                            <Link to={'#'}>
                                                <p className="mb-1" >Tên sản phẩm</p>
                                                <div className="bg-gray-100" >
                                                    <img src="https://onoff.vn/media/catalog/product/cache/ecd9e5267dd6c36af89d5c309a4716fc/W77TP20251.jpg " className="w-[70px]" alt="no images" />
                                                </div>
                                            </Link>
                                            <Link to={'#'}>
                                                <p className="mt-2 mb-1" >Website Markup</p>
                                                <div className="" >
                                                    <div className="bg-gray-100" >
                                                        <img src="https://onoff.vn/media/catalog/product/cache/ecd9e5267dd6c36af89d5c309a4716fc/W77TP20251.jpg " className="w-[70px]" alt="no images" />
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to={'#'}>
                                                <p className="mt-2 mb-1" >One Page</p>
                                                <div className="" >
                                                    <div className="bg-gray-100" >
                                                        <img src="https://onoff.vn/media/catalog/product/cache/ecd9e5267dd6c36af89d5c309a4716fc/W77TP20251.jpg " className="w-[70px]" alt="no images" />
                                                    </div>
                                                </div>
                                            </Link>


                                            <Link to={'#'} className="text-primary align-items-center font-italic me-1">Xem thêm</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>}
    </>
}

export default AccountDetail