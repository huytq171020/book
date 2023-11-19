import joi from "joi";

export const productSchema = joi.object({
  name: joi.string().required("Tên sản phẩm là trương dữ liệu bắt buộc"),
  price: joi.number().required("Giá là trường dữ liệu bắt buộc"),
  sale_off: joi.number(),
  description: joi.string().required("Mô tả bắt buộc 200 chữ trở lên"),
  quantity: joi.number().min(1).required("Số lượng ít nhất là 1"),


  images: joi.array().items(joi.string()).min(2).required("images không được bỏ trống"),
  categoryId: joi.string().required("Loại sản phẩm là trường dữ liệu bắt buộc"),
});
