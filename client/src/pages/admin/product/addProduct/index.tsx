import { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, InputNumber, Radio, Row, Select, Space } from 'antd';

import { useGetCategoriesQuery } from '@/services/category';
import { toast } from 'react-toastify';
import { useCreateProductMutation } from '@/services/product';
import { ProductType } from '@/types/Product';

import UploadFileServer from '@/components/uploads/UploadFile';

const { TextArea } = Input;

interface AddProductProps {
    handleModalClose: () => void;
}

const AddProduct = ({ handleModalClose }: AddProductProps) => {
    const [value, setValue] = useState<string | number | null>('');
    const [_products, setProducts] = useState<ProductType[]>([]);
    const [images, setImages] = useState<string[]>([]);

    const [mutateCreateProduct] = useCreateProductMutation();
    const [form] = Form.useForm();
    const { data: categories } = useGetCategoriesQuery();
    const [isLoading, setIsLoading] = useState(false);




    const onFinish = async (values: any) => {
        try {
            setIsLoading(true);

            const { size, categoryId, ...restValues } = values;

            await mutateCreateProduct({ ...restValues, categoryId, images }).unwrap();

            const newProduct = { ...restValues, categoryId };
            setProducts((prevProducts) => [...prevProducts, newProduct]);

            form.resetFields();
            toast.success('Tạo sản phẩm thành công');
            handleModalClose();
        } catch (error) {
            toast.error('Tạo sản phẩm không thành công');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            onFinish={onFinish}
        >
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm ' }]}
            >
                <Input placeholder="Tên sản phẩm" type="text" />
            </Form.Item>
            <Form.Item label="tác giả" name="authors" rules={[{ required: true, message: 'Vui lòng nhập tác giả' }]}>
                <Input placeholder="tên tác giả" type="text" />
            </Form.Item>
            
            <Form.Item label="Giá gốc" name="price" rules={[{ required: true, message: 'Vui lòng nhập Giá' }]}>
                <Input placeholder="Giá gốc sản phẩm" type="number" />
            </Form.Item>

            <Form.Item label="Giá sale" name="sale_off">
                <Input placeholder="Giá sale sản phẩm" type="number" />
            </Form.Item>

            <Form.Item
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm ' }]}
            >
                <Space>
                    <InputNumber min={1} max={99} value={value} onChange={setValue} />
                    <Button
                        type="dashed"
                        onClick={() => {
                            setValue(0);
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </Form.Item>

            <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập Mô tả ' }]}>
                <TextArea
                    showCount
                    maxLength={100}
                    style={{ height: 120, marginBottom: 24 }}
                    placeholder="Mô tả sản phẩm"
                />
            </Form.Item>

            {/* Option start */}






            <Form.Item
                label="Danh mục"
                name="categoryId"
                rules={[{ required: true, message: 'Vui lòng nhập Danh mục' }]}
            >
                <Select placeholder="Danh mục">
                    {categories?.docs.map((category) => (
                        <Select.Option key={category._id}>{category.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Thêm ảnh">
                <UploadFileServer setImages={setImages} />
            </Form.Item>

            {/* Option end */}

            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                <Button disabled={images.length === 0} type="default" htmlType="submit" loading={isLoading}>
                    Thêm mới
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddProduct;
