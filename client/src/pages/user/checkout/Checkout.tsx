import { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hook';
import { checkAuth } from '@/utils/checkAuth';
import Loading from '@/components/ui/Loading';
import { Form, Radio, RadioChangeEvent } from 'antd';
import { reduceTotal } from '@/utils/reduce';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import CheckoutNormal from '@/components/checkout/CheckoutNormal';

const LocationList: React.FC = () => {
    const { data: authData, isLoading: authLoading } = checkAuth();
    const [form] = Form.useForm();

    // Pay method
    const [payMethod, setPayMethod] = useState(0);
    const [methodBody, setMethodBody] = useState<ReactNode>(<div></div>);
    const [loading, setLoading] = useState(false);

    const { cartItems } = useAppSelector((state) => state.cart);

    const onChange = (e: RadioChangeEvent) => {
        setPayMethod(e.target.value);
    };

    useEffect(() => {
        if (authData) {
            form.setFieldsValue({
                email: authData.email,
                username: authData.username,
            });
        }
    }, [authData, form]);

    useEffect(() => {
        if (payMethod === 1) {
            setLoading(true);
            setMethodBody(
                <div>
                    <CheckoutForm form={form} cartItems={cartItems} authData={authData!} payMethod={payMethod} />
                </div>,
            );
        } else if (payMethod === 0) {
            setLoading(true);
            setMethodBody(
                <div>
                    <div className="mt-2">
                        <CheckoutNormal form={form} cartItems={cartItems} payMethod={payMethod} />
                    </div>
                </div>,
            );
        }
    }, [payMethod, loading]);

    return (
        <div>
            <div>
                {authLoading ? (
                    <div className="h-screen">
                        <Loading />
                    </div>
                ) : (
                    <div>
                        {cartItems.length === 0 ? (
                            <div className="flex items-center flex-col h-screen justify-center gap-y-2">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png"
                                    className="w-[360px] h-[360px] opacity-25"
                                    alt=""
                                />

                                <h1 className="mt-10 text-xl font-semibold">Giỏ hàng của bạn hiện đang trống.</h1>
                                <p className="max-w-[960px] text-center">
                                    Trước khi tiến hành thanh toán, bạn phải thêm một số sản phẩm vào giỏ hàng của mình.
                                    Bạn sẽ tìm thấy rất nhiều sản phẩm thú vị trên trang "Cửa hàng" của chúng tôi.
                                </p>

                                <a href="/" className="uppercase bg-primary/90 text-white text-center px-4 py-2">
                                    Trở lại cửa hàng
                                </a>
                            </div>
                        ) : (
                            <div>
                                {authLoading ? (
                                    <div className="h-screen">
                                        <Loading />
                                    </div>
                                ) : (
                                    <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 py-10">
                                        <div className="px-4 pt-8">
                                            <p className="text-xl font-medium">Order Summary</p>
                                            <p className="text-gray-400">
                                                Check your items. And select a suitable shipping method.
                                            </p>
                                            <table className="border mt-6">
                                                <thead>
                                                    <tr>
                                                        <td className="px-2 py-2">SẢN PHẨM</td>
                                                        <td className="line-clamp-1 px-2 py-2">SỐ</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartItems.map((item) => (
                                                        <tr key={item._id}>
                                                            <td className="border px-2 py-2 font-bold text-base">
                                                                {item.name}
                                                            </td>
                                                            <td className="border px-2 py-2 font-bold text-base text-primary/90">{`x${item.quantity}`}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <h3 className="text-xl font-bold text-primary/90 mt-4">
                                                TỔNG TIỀN: ${reduceTotal(cartItems)}
                                            </h3>
                                            <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                                        </div>

                                        <div>
                                            <Radio.Group onChange={onChange} value={payMethod}>
                                                <Radio className="w-full mt-2" value={0}>
                                                    Thanh toán khi nhận hàng
                                                </Radio>
                                                <Radio className="w-full mt-2" value={1}>
                                                    Thanh toán ngay
                                                </Radio>
                                            </Radio.Group>
                                            {methodBody}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationList;
