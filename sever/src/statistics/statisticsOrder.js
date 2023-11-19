import Order from "../models/order.js";

export const getRevenueByMonth = async (req, res) => {
    try {
      const data = await Order.find();
 
      let totalRevenue = 0;
      data.forEach((order) => {
        totalRevenue += order.totalAmount;
      });
  
      res.status(200).json({ totalRevenue });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      res.status(500).json({ error: "Lỗi khi lấy danh sách đơn hàng" });
    }
  };