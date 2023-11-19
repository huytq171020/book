import joi from "joi";

export const categorySchema = joi.object({
  name: joi.string().min(2).max(255).required().messages({
    "string.base": `Tên danh mục phải là kiểu 'text'`,
    "string.empty": `Tên danh mục không được bỏ trống`,
    "string.min": `Tên danh mục phải chứa ít nhất {#limit} ký tự`,
    "string.max": `Tên danh mục không được vượt quá {#limit} ký tự`,
    "any.required": `Tên danh mục là trường bắt buộc`,
  }),
  thumbnail: joi.string(),
  products: joi.array().items(),
});
