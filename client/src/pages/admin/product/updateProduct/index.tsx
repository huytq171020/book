import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Col, Form, Input, InputNumber, Radio, Row, Select, Tag, message } from 'antd';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/services/product';
import { useGetCategoriesQuery } from '@/services/category';
import { toast } from 'react-toastify';

import UploadFileServer from '@/components/uploads/UploadFile';


type SizeType = Parameters<typeof Form>[0]['size'];

const UpdateProduct: React.FC<{ productId: string; handleUpdateProduct: () => void }> = ({
    productId,
    handleUpdateProduct,
}) => {
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    const { data: currentProduct } = useGetProductByIdQuery(productId);

    const { TextArea } = Input;
    const [form] = Form.useForm();

    const { data: categoryData } = useGetCategoriesQuery();
 

    const categories = categoryData?.docs || [];
    const [isLoading, setIsLoading] = useState(false);
    const [update] = useUpdateProductMutation();

    const [images, setImages] = useState<string[]>(currentProduct?.images!);



    const onFinish = async (values: any) => {
        try {
            setIsLoading(true);

          
            await update({
                productId,
                updatedProduct: {
                    ...currentProduct,
                    ...values,
                   
                    images,
                },
            });
            toast.success('Cập nhật sản phẩm thành công');
            handleUpdateProduct();
        } catch (error) {
            toast.error('Cập nhật sản phẩm không thành công');
        } finally {
            setIsLoading(false);
        }
    };

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        if (currentProduct) {
            form.setFieldsValue({
                name: currentProduct.name,
                authors: currentProduct.authors,
                price: currentProduct.price,
                sale_off: currentProduct.sale_off,
                quantity: currentProduct.quantity,
                description: currentProduct.description,
                categoryId: currentProduct.categoryId?._id,
               
            });
        }
    }, [currentProduct, form]);

    useEffect(() => {
        setImages(currentProduct?.images!)
    },[currentProduct?.images])

    //
    return (
        <>
            {currentProduct ? (
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    layout="horizontal"
                    onValuesChange={onFormLayoutChange}
                    size={componentSize as SizeType}
                    onFinish={onFinish}
                    initialValues={{
                        size: componentSize,
                    }}
                >
                    <Form.Item label="Form Size" name="size">
                        <Radio.Group>
                            <Radio.Button value="small">Small</Radio.Button>
                            <Radio.Button value="default">Default</Radio.Button>
                            <Radio.Button value="large">Large</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Sản phẩm"
                        rules={[
                            {
                                required: true,
                                message: 'Tên sản phẩm là cần thiết!',
                            },
                        ]}
                    >
                        <Input placeholder="Vui lòng nhập tên sản phẩm" style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    <Form.Item
                        name="authors"
                        label="Tác giả"
                        rules={[
                            {
                                required: true,
                                message: 'Tên Tác giả là cần thiết!',
                            },
                        ]}
                    >
                        <Input placeholder="Vui lòng nhập tên Tác giả" style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                            {
                                required: true,
                                message: 'Giá là cần thiết!',
                            },
                        ]}
                    >
                        <InputNumber placeholder="Vui lòng gõ giá" style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    <Form.Item name="sale_off" label="Giá sale">
                        <InputNumber placeholder="Vui lòng gõ sale" style={{ width: '100%' }} min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Số lượng là cần thiết!',
                            },
                        ]}
                    >
                        <InputNumber placeholder="Số lượng" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[
                            {
                                required: true,
                                message: 'Mô tảf là cần thiết!',
                            },
                        ]}
                    >
                        <TextArea
                            showCount
                            maxLength={100}
                            style={{ height: 120, marginBottom: 24 }}
                            placeholder="Mô tả sản phẩm"
                        />
                    </Form.Item>

                    {/* Option start */}

                  

                   

                    {/* Option end */}
                    <Form.Item
                        name="categoryId"
                        label="Category"
                        rules={[
                            {
                                required: true,
                                message: 'Category is required!',
                            },
                        ]}
                    >
                        <Select placeholder="Select a category" optionFilterProp="children">
                            {categories.map((category) => (
                                <Select.Option key={category._id} value={category._id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Thêm ảnh">
                        <UploadFileServer images={images!} setImages={setImages} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                        <Button type="primary" className="bg-primary" htmlType="submit" loading={isLoading}>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <div>Loading product ...</div>
            )}
        </>
    );
};

export default UpdateProduct;
