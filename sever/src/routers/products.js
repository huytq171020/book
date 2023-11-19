import express from "express";
import {
  create,
  getAll,
  getById,
  getQuanlityProduct,
  remove,
  update,
} from "../controllers/products.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const router = express.Router();
router.get("/products", getAll);
router.get("/products/quanlity", getQuanlityProduct);

router.get("/products/:id", getById);
router.delete("/products/:id", remove);
router.post("/products", create);
router.patch("/products/:id", update);
export default router;
