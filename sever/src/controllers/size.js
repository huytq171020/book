import Size from "../models/size.js";
import joi from "joi";
const sizeSchema = joi.object({
    name: joi.string().required("name là trương dữ liệu bắt buộc"),
})

export const create = async(req,res)=>{
    try {
        const {error} = sizeSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details.map((err)=> err.message)
            });
        }
        const data = await Size.create(req.body)
        if (data.length === 0) {
            return res.status(201).json({
                message: "không thêm được size"
            });
        }
        return res.json(data)
        
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


export const getAll = async (req, res) => {
    try {
        const data = await Size.find()
        if (data.length === 0) {
            return res.status(201).json({
                message: "Không có dữ liệu"
            });
        }
        return res.json(data)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


export const getById = async(req, res) =>{
    try {
        const data = await Size.findById(req.params.id).populate("products");
        if (data.length === 0) {
            return res.status(201).json({
                message: "Không có dữ liệu"
            });
        }
        return res.json(data) 
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


export const updata = async (req, res) => {
    try {
        const data = await Size.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (data.length === 0) {
            return res.status(201).json({
                message: "Cập nhập size không thành công",
            });
        }
        return res.json(data)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


export const remove = async (req, res) => {
    try {
        const data = await Size.findByIdAndDelete({ _id: req.params.id });
        if (data.length === 0) {
            return res.status(201).json({
                message: "Xóa thành công",
            });
        }
        return res.json({
            message: "Xóa thành công"
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}