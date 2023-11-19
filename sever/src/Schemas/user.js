import joi from "joi";

export const UserSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường email là bắt buộc",
    }),
})