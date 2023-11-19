import Auth from "../models/auth.js";
import { UserSchema } from "../Schemas/user.js";
import bcryptjs from 'bcryptjs';

export const update = async (req, res) => {

    try {

        const { password } = req.body;

        const hashPassword = await bcryptjs.hash(password, 10)

        const data = await Auth.findOneAndUpdate({ _id: req.params.id }, { ...req.body, password: hashPassword }, {
            new: true,
        });
        if (data.length === 0) {
            return res.status(200).json({
                message: "Cập nhật User không thành công",
            });
        }
        return res.status(200).json({
            message: "Cập nhật User thành công",
            data,
        });
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {

    try {
        const data = await Auth.findByIdAndDelete({ _id: req.params.id }, {
            new: true,
        });
        return res.status(200).json({
            message: "xoa USer thanh cong",
            data,
        });
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};


export const getOne = async (req, res) => {
    try {

        const data = await Auth.findById(req.params.id)
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.status(200).json({
            message: "Danh sách one",
            data,
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });

    }
}


export const getAll = async (req, res) => {
    const {
        _limit = 7,
        _sort = "createAt",
        _order = "asc",
        _page = 1,
    } = req.query;

    const options = {
        limit: _limit,
        page: _page,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        },
    };
    try {
        const data = await Auth.paginate({}, options);
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};