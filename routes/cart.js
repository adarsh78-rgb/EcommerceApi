import express from "express";
import { addToCart, clearCart, decreaseProductQusntity, removeProductFromCart, userCart } from "../controllers/cart.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

//add to cart
router.post('/add', isAuthenticated, addToCart);
//get User cart
router.get('/user', isAuthenticated, userCart);
//remove product from cart
router.delete('/remove/:productId', isAuthenticated, removeProductFromCart);
//clear cart
router.delete('/clear',isAuthenticated, clearCart);
//decrease quantity from cart
router.post('/--qty',isAuthenticated, decreaseProductQusntity);

export default router;