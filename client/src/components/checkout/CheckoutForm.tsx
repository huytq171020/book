import { Button, Form, FormInstance, Input, InputNumber } from 'antd';
import { Status } from '@/types/status';
import axios from 'axios';
import { reduceTotal } from '@/utils/reduce';

interface Props {
    cartItems: any[];
    authData: {
        _id: string;
        email: string;
        username: string;
    };
    payMethod: number;
    form: FormInstance<any>;
}

export default function CheckoutForm({ authData, cartItems, payMethod, form }: Props) {

    const handleCheckout = (values: any) => {
        const { ...rest } = values;

        axios
            .post('http://localhost:8080/stripe/create-checkout-session', {
                cartItems,
                userId: authData._id,
                ...rest,
                payMethod,
                status: Status.INFORMATION,
                total: Number(reduceTotal(cartItems)),
            })
            .then((res) => {
                if (res.data.url) {
                    window.location.href = res.data.url;
                }
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <Form id="payment-form" className="mt-4" form={form} layout="vertical" onFinish={handleCheckout}>
            <Form.Item initialValue={authData.username} label={'Tên đăng nhập'}>
                <Input disabled value={authData.username} />
            </Form.Item>
            <Form.Item
                rules={[
                    { required: true, message: 'Bắt buộc' },
                    { type: 'email', message: 'Phải đúng định dạng Email' },
                ]}
                label={'Email'}
                name={'email'}
            >
                <Input />
            </Form.Item>
            <Form.Item
                rules={[{ required: true, message: 'Bắt buộc' }]}
                label={'Địa chỉ chi tiết (Ví dụ: "Xã - Huyện/Quận - Tỉnh/Thành phố")'}
                name={'shipping'}
            >
                <Input />
            </Form.Item>

            <Form.Item rules={[{ required: true, message: 'Bắt buộc' }]} label={'Tên đẩy đủ'} name={'fullName'}>
                <Input />
            </Form.Item>

            <Form.Item
                rules={[{ required: true, message: 'Bắt buộc', type: 'number' }]}
                label={'Số điện thoại'}
                name={'phone'}
            >
                <InputNumber className="w-full" type="number" />
            </Form.Item>

            <Button htmlType="submit">
                Gửi biểu mẫu
            </Button>
        </Form>
    );
}
