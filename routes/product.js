import express from "express";
import { addProduct, deleteProductById, getAllProduct, getProductById, updateProductById } from "../controllers/product.js";

const router = express.Router();

//Product routes
//add product
router.post('/add',addProduct);
//getAll products
router.get('/getAll',getAllProduct)
//get product by id
router.get('/:id',getProductById);
//update product by id
router.put('/:id',updateProductById);
//delete product by id
router.delete('/:id',deleteProductById);



export default router;

//10:27