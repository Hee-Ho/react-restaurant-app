import Order from "../models/order.model.js";
import Customer from "../models/customer.model.js";
import Restaurant from "../models/restaurant.model.js";
import Employee from "../models/employee.model.js";

export const createOrderRepo = async(query, body) => {
        try {
        //this version will retrieve the user cart first using the cid
                let cart = await Order.findOne({cid: parseInt(query.cid), status: -1}).populate("items.item");
                if (cart === null || cart.items.length < 1) {
                        return [false, "Empty cart"];
                }
                let customer = await Customer.findOne({cid: cart.cid}).select("_id");
                let restaurant = await Restaurant.findOne({rid: cart.rid}).select("_id");
                cart.order_id = new Date().valueOf(); //generate orderID
                cart.status = 0; //set cart to ordered
                cart.customer = customer._id;
                cart.restaurant = restaurant._id;
                cart.schedule = body.schedule;
                cart.orderAt = new Date();
                cart.pickup = cart.orderAt;
                let order = await cart.save();
                return [true, order];
        } catch (e) {
                throw Error ("Error while creating order");
        }
}

//query is the restaurant id
export const setOrderStatusRepo= async(rid, body) => {
        try {
                const authorizer = await Employee.findOne({rid: rid, wid: body.wid});
                if (authorizer.pos > 2 || authorizer === null) {
                        return [false, "You are not authorize to make change to this item"];
                }
                let order = await Order.findOne({rid: rid, order_id: body.order_id, status: {$gt: -1}});
                if ( order === null ) {
                        return [false, "Order not found"];
                }
                if (body.hasOwnProperty('status')) { //set order status
                        if (body.status < order.status) {
                                return [false, "Cannot reverse order status"]
                        }
                        if (body.status > 3) {
                                return [false, "Invalid order status"]
                        }
                        order.status = body.status;
                }
                if (body.hasOwnProperty('h')) { //set pickup time
                        const date = new Date();
                        date.setHours(body.h);
                        date.setMinutes(body.m);
                        //need to set up time validation
                        if (date < order.orderAt) {
                                return [false, "Invalid pick up time"]
                        }
                        order.pickup = date;
                }
                let saved = await Order.findOneAndUpdate({rid: rid, order_id: body.order_id, status: {$gt: -1}}, order, {new: true}).populate("items.item");
                return [true, saved];
        }
        catch (e) {
                throw Error ("Error while update order status")
        }
}

//customer version, only update status to complete
export const setOrderStatusRepoC = async(cid, body) => {
        try {
                const authorizer = await Customer.findOne({cid: cid})
                if (authorizer === null) {
                        return [false, "You are not authorize to make change to this item"];
                }
                let order = await Order.findOne({cid: cid, order_id: body.order_id, status: {$gt: -1}});
                if ( order === null ) {
                        return [false, "Order not found"];
                }
                if (order.status < 2) {
                        return [false, "Order is not ready for pickup"]
                }
                order.status = 3;
                let saved = await Order.findOneAndUpdate({cid: cid, order_id: body.order_id, status: {$gt: -1}}, order, {new: true}).populate("items.item");
                return [true, saved];
        }
        catch (e) {
                throw Error ("Error while update order status")
        }
}

//--------------------------------------------------Get all Orders for customers and restaurants-----------------------------------------------------------------
//for customer
export const getOrdersRepo = async(query) => {
        try {

                let orders = await Order.find({cid: query.cid, status: {$gt: -1, $lt: 3}}).sort({"rid": 1,"schedule": 1}).populate("items.item").populate('restaurant', '-menu'); //return an array
                return [true, orders];
        }
        catch (e) {
                throw Error ("Error while retrieving orders")
        }
}
//for restaurant
export const getOrdersRepo2 = async(query) => {
        try {
                let orders = await Order.find({rid: query.rid, status: {$gt: -1, $lt: 3}}).sort({"schedule": 1}).populate("items.item").populate('customer'); //return an array
                return [true, orders];
        }
        catch (e) {
                throw Error ("Error while retrieving orders")
        }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//for searching for specific order
export const getSpecOrdeRepo = async(query, body) => {
        try {
                const cid = query.cid;
                const order_id = body.order_id;
                let orders = await Order.findOne({cid: cid, order_id: order_id, status: {$gt: -1}}).populate("items.item");
                return orders;
        }
        catch (e) {
                throw Error ("Error while retrieving customer's orders")
        }
}

//-------------------------------------------------------------Get Orders history within a selected month-------------------------------------------------------------
//Body will contain the month and year
export const getOrdersHistoryRepo = async(query, body) => {
        try {
            if (body.month > 12) {
                return [false, "Invalid Month"];
            }
            const year = new Date().getFullYear();
            const startdate = new Date(year, body.month - 1, 1);
            const enddate = new Date(year, body.month, 0);
            const record = await Order.find({rid: query.rid, status: 3, orderAt: {$gte: startdate, $lte: enddate}});
            return [true, record];
        } catch (e) {
            throw Error ("Error while retrieving sales history");
        }
    }

//For customer
export const getOrdersHistoryRepoC = async(query, body) => {
        try {
            if (body.month > 12) {
                return [false, "Invalid Month"];
            }
            const year = new Date().getFullYear();
            const startdate = new Date(year, body.month - 1, 1);
            const enddate = new Date(year, body.month , 0);
            const record = await Order.find({cid: query.cid, status: 3, orderAt: {$gte: startdate, $lte: enddate}});
            return [true, record];
        } catch (e) {
            throw Error ("Error while retrieving orders history");
        }
}

//Method to retrieve all past orders
export const getAllOrdersHistoryR = async (query, body) => {
        try {
                let orders;
                orders = await Order.find({rid: query.rid, status: 3}).sort({'orderAt': -1})
                .populate('items.item').populate('customer');
                return [true, orders]
        } catch (e) {
        throw Error ("Error while retrieving orders history");
        }
}

export const getAllOrdersHistoryC = async (query, body) => {
        try {
                let orders;
                orders = await Order.find({cid: query.cid, status: 3}).sort({'orderAt': -1})
                .populate('items.item').populate('restaurant', '-menu');
                return [true, orders]
        } catch (e) {
                throw Error ("Error while retrieving orders history");
        }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
