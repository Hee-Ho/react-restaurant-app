import express from "express";
import { getAllCustomers, getCustomer } from "../controllers/customer.controller.js";
import { getCart, addToCart, resetCart, editCart, removeFromCart, reOrder } from "../controllers/cart.controller.js";
import { createOrder, getOrdersCustomer, getOrdersHistoryC, setOrderStatusCustomer, getAllOrdersC } from "../controllers/order.controller.js";
const customerRouter = express.Router();

customerRouter.get("/:cid", getCustomer);
customerRouter.get("/", getAllCustomers);

//cart information
customerRouter.get("/cart/:cid", getCart);
customerRouter.delete("/cart/:cid", resetCart); //reset cart
customerRouter.patch("/cart/add/:cid", addToCart); //add item to cart
customerRouter.patch("/cart/edit/:cid", editCart); //edit item quantity from cart
customerRouter.delete("/cart/remove/:cid", removeFromCart); //remove an item from cart
customerRouter.patch("/cart/reorder/:cid", reOrder); //add item from previous order top cart 

//orders information
customerRouter.patch("/order/complete/:cid", setOrderStatusCustomer);//set order to complete
customerRouter.patch("/orders/:cid", createOrder); //create order from cart
customerRouter.get("/orders/:cid", getOrdersCustomer); //get all pending orders
customerRouter.get("/orders/history/:cid", getOrdersHistoryC); //get order history by months
customerRouter.get("/orders/all/:cid", getAllOrdersC); //get all complete order


export default customerRouter;
