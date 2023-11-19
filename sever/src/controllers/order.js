import { orderSchema } from "../Schemas/order.js";
import Order from "../models/order.js";
import shortid from 'shortid'
export const createOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Tạo mã đơn hàng mới với độ dài 5 ký tự
    const orderNumber = shortid.generate();

    const { status, fullName, shipping, products, userId, phone, payMethod, total, email } = req.body;
    // Tính tổng tiền từ danh sách sản phẩm

    const newOrder = new Order({ orderNumber, status, fullName, shipping, products, total, phone, payMethod, email, userId });
    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    return res.status(500).json({ error: 'Không thể tạo đơn hàng' });
  }
};


// Controller để lấy danh sách đơn hàng
export const getOrders = async (req, res) => {
  const {
    _limit = 20,
    _sort = "createdAt",
    _order = "asc",
    _page = 1,
  } = req.query;

  const options = {
    limit: parseInt(_limit),
    page: parseInt(_page),
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };
  try {
    const data = await Order.paginate({}, options);

    if (data.docs.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách đơn hàng' });
  }
};


export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Tìm đơn hàng dựa trên orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    // Kiểm tra xem trạng thái mới cung cấp hợp lệ hay không
    // if (!['Đang xử lý', 'Chờ xác nhận', 'Đã giao hàng', 'Đã hủy'].includes(status)) {
    //   return res.status(400).json({ message: 'Trạng thái mới không hợp lệ' });
    // }

    // Cập nhật trạng thái của đơn hàng thành trạng thái mới
    const newSatus = await Order.updateOne({ _id: orderId }, { status }, { new: true })

    // Lưu thay đổi vào cơ sở dữ liệu

    return res.status(200).json({ message: 'Cập nhật trạng thái thành công', order: newSatus });
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    return res.status(500).json({ error: error.message });
  }
};
//  ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error('Error while retrieving order by ID:', error);
    return res.status(500).json({ error: 'Failed to retrieve order' });
  }
};