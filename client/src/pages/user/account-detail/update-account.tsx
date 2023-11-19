import { provinces } from '@/seeds';
import { useMeQuery } from '@/services/auth';
import { useGetUserByIdQuery, useUpdateUserMutation } from '@/services/user';
import { Button, Form, Input, Select, Spin } from 'antd';
import { useEffect } from 'react';


type FieldType = {
    username?: string;
    password?: string;
    role?: string;
    phone?: number;
    email?: string;
    address?: string;
};

const { Option } = Select;

const UpdateAccount: React.FC = () => {
    const { data: authData } = useMeQuery();

    const id: string | undefined = authData?._id as string | undefined;

    const { data: userData, isLoading } = useGetUserByIdQuery(id as string);
    const [updateUser, { isLoading: userLoading, isSuccess }] = useUpdateUserMutation();



    const onFinish = (values: any) => {
        updateUser({ _id: userData?.data._id, ...values });
    };

    useEffect(() => {
        isSuccess === true;
    }, [isSuccess]);

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            {isLoading && !userData ? (
                <Spin />
            ) : (
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        initialValue={userData?.data.username}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        initialValue={userData?.data.email}
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Số điện thoại"
                        name="phone"
                        initialValue={`0${userData?.data.phone}`}
                        rules={[{ required: true, message: 'Please input your phone!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Địa chỉ"
                        name="address"
                        initialValue={userData?.data.address}
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Select>
                            {provinces.map((prov) => (
                                <Option key={prov.value} value={prov.value}>
                                    {prov.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>


                    <Form.Item>


                        <Button loading={userLoading} htmlType="submit" type="default" className="ml-2">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default UpdateAccount;
