import express from "express";
import { getAllProducts, createProduct, putProduct, deleteProduct } from "../controller/product.controller.js";
import { isAuth } from "../utils/isAuth.js";
const router = express.Router()


router.get("/", getAllProducts)
router.post("/", createProduct)
router.put("/:id", putProduct)
router.delete("/:id", deleteProduct)


export default router;