import React from "react";
import Slider from "react-slick";

const RelatedProducts: React.FC = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="py-10 mx-auto px-4">
            <h2 className="pb-6 px-4 font-bold">SẢN PHẨM CÙNG LOẠI</h2>
            <Slider {...settings}>
                <img src="https://salt.tikicdn.com/cache/550x550/ts/product/38/df/17/a9dbcb90ede74cc86a994d2f13ab8d0d.jpg" alt="" className="w-[300px] object-cover h-[350px] px-2 py-2" />
                <img src="https://cdn.tgdd.vn/Files/2022/02/20/1416376/ao-phong-unisex-la-gi-vi-sao-gioi-tre-ngay-cang-uu-chuong-loai-ao-nay-202202210645350067.jpg" alt="" className="w-[300px] object-cover h-[350px] px-2 py-2" />
                <img src="https://down-vn.img.susercontent.com/file/9ed1c76c1cb0b04e7d18c0c006b9dcc3" alt="" className="w-[300px] object-cover h-[350px] px-2 py-2" />
                <img src="https://salt.tikicdn.com/ts/product/97/60/f0/ab85e1918334b6e04ec8c834a607b35b.jpg" alt="" className="w-[300px] object-cover h-[350px] px-2 py-2" />
                <img src="https://cf.shopee.vn/file/e2f89c1b891f4c4989375823794f8592" alt="" className="w-[300px] object-cover h-[350px] px-2 py-2" />
                <img src="https://laz-img-sg.alicdn.com/p/1c2774215295e8046283771dd34fb932.jpg" alt="" className="w-[300px] object-cover h-[350px] px-2 py-2" />
            </Slider>
        </div>
    );
};

export default RelatedProducts;
