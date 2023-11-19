import { Typography, Table, Button } from "antd";
import { useGetsOrderQuery } from "@/services/order";
import { IOrder, Iuser } from "@/types/order";
import React, { useState } from "react";
const { Title } = Typography;

export default function Hoadon() {
  const { data: orders, isLoading: isOrdersLoading } = useGetsOrderQuery();
  const currentDate = new Date().toLocaleString();


  if (isOrdersLoading) {
    return <div>Loading...</div>;
  }


    return (
        <div className="">
            <div className="">
                <div className="col-lg-12 ">
                    <div className="card">
                        {orders?.docs.map((order: IOrder) => {


                            return (
                                <React.Fragment key={order._id}>
                                    <div className="card-body">

                                        <div className="invoice-title">
                                            <h4 className="float-end font-size-15">
                                                Hóa Đơn: {order.orderNumber}
                                                <span className={`badge ${order.status === 1 ? 'bg-success' : 'bg-danger'} font-size-12 ms-2`}>
                                                    {order.status === 1 ? "Paid" : "Unpaid"}
                                                </span>
                                            </h4>
                                            <div className="mb-4">
                                                <Title level={2} className="mb-1 text-muted">
                                                    Alibaba.com
                                                </Title>
                                            </div>
                                            <div className="text-muted">
                                                <p className="mb-1">Cao đẳng FPT Polytechnic</p>
                                                <p className="mb-1">
                                                    <i className="uil uil-envelope-alt me-1"></i>{" "}
                                                    caodangfpt.hn@fpt.edu.vn
                                                </p>
                                                <p>
                                                    <i className="uil uil-phone me-1"></i> 0981 725 836
                                                </p>
                                            </div>
                                        </div>

                                        <hr className="my-4" />


                                        <div className="container">
                                            <div className="flex">
                                                <div className="col-lg-6">
                                                    <div className="text-muted">
                                                        <Title level={5} className="font-size-16 mb-3">
                                                            Khách Hàng:
                                                        </Title>
                                                        <Title level={5} className="font-size-15 mb-2">
                                                            {order.fullName}
                                                        </Title>
                                                        <p className="mb-1">{order.shipping}</p>
                                                        <p className="mb-1">{order.email}</p>
                                                        <p>0{order.phone}</p>
                                                    </div>
                                                </div>

                                                <div className="col-lg-5">
                                                    <div className="text-muted text-lg-end">
                                                        <div>
                                                            <Title level={5} className="font-size-15 mb-1">
                                                                Hóa Đơn:
                                                            </Title>
                                                            <p>{order.orderNumber}</p>
                                                        </div>
                                                        <div className="mt-4">
                                                            <Title level={5} className="font-size-15 mb-1">
                                                                Ngày lập hóa đơn:
                                                            </Title>
                                                            <p>{currentDate}</p>
                                                        </div>
                                                        <div className="mt-4">
                                                            <Title level={5} className="font-size-15 mb-1">
                                                                Mã đơn hàng:
                                                            </Title>
                                                            <p>#{order._id}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-2">
                                            <Title level={5} className="font-size-15">
                                                Order Summary
                                            </Title>

                                            <div className="table-responsive">
                                                <Table
                                                    dataSource={order.products.map((product, index) => {
                                                        let productIndex = index + 1;
                                                        return {
                                                            key: productIndex,
                                                            item: product.name,

                                                            price: `$ ${product.price}`,
                                                            quantity: product.quantity,
                                                            total: `$ ${product.price * product.quantity}`
                                                        };
                                                    })}
                                                    columns={[
                                                        {
                                                            title: "No.",
                                                            dataIndex: "key",
                                                            key: "key",
                                                            width: 70
                                                        },
                                                        {
                                                            title: "Item",
                                                            dataIndex: "item",
                                                            key: "item"
                                                        },

                                                        {
                                                            title: "Price",
                                                            dataIndex: "price",
                                                            key: "price"
                                                        },
                                                        {
                                                            title: "Quantity",
                                                            dataIndex: "quantity",
                                                            key: "quantity"
                                                        },
                                                        {
                                                            title: "Total",
                                                            dataIndex: "total",
                                                            key: "total"
                                                        }
                                                    ]}
                                                    pagination={false}
                                                    size="small"
                                                />
                                            </div>

                                        </div>

                                        <div className="d-print-none mt-4">
                                            <div className="float-end">
                                                <Button
                                                    type="primary"
                                                    className="me-1"
                                                    onClick={() => window.print()}
                                                >
                                                    Print
                                                </Button>
                                                <Button href="#" type="primary">Send</Button>
                                            </div>

                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}