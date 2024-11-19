import Order from "../models/order.model.js";
import Item from "../models/item.model.js";
import Customer from "../models/customer.model.js";

export const getCartRepo = async(query) => {
    try {
        let exist = await Customer.exists({cid: query.cid});
        if (!exist) {
            return [false, "Customer don't exist"]
        }
        let cart = await Order.findOne({cid: query.cid, status: {$lt: 0}}).populate("items.item");
        if (cart === null) {
            return [true, "Cart is Empty"];
        }
        return [true, cart];
    } catch (e) {
        throw Error ("Error while getting cart")
    }
}

/**
 * Method to create a shopping cart
 */
export const createCartRepo = async(body) => {
    try {
        let exist = await Customer.exists({cid: query.cid});
        if (!exist) {
            return [false, "Customer don't exist"]
        }
        let cart = await Order.findOne(body);
        if (cart === null) { //create new cart if none exist
            body.total = 0;
            cart = await new Order(body); //create new cart with the item
            let saved = await cart.save();
            return [true, saved];
        } else {
            return cart;
        }
    } catch (e) {
        throw Error ("Error while creating cart")
    }
}

export const addItemToCartRepo = async(query, body) => {
        let exist = await Customer.exists({cid: query.cid});
        if (!exist) {
            return [false, "Customer don't exist"]
        }
        let cart = await Order.findOne({cid: query.cid, status: {$lt: 0}}).populate('items.item');
        if (!cart) { //create new cart if none exist
            query.total = 0;
            cart = await new Order(query).save();
        }
        if (cart.items.length > 0 && cart.rid > -1) { //cart is not empty
            if (cart.rid != body.rid){ //check if the add item is from the same restaurant
                return [false, "Item is not from the same restaurant"];
            }
            const existingItem = cart.items.find(item => item.item.mid === body.mid);
            if (existingItem) { //update qunatity and price if item already in cart
                existingItem.quantity = existingItem.quantity + body.quantity; //update quantity
                existingItem.total = (parseFloat(existingItem.total) + (parseFloat(existingItem.item.price) * body.quantity)).toFixed(2); //update the price of the existing item
                cart.total = (parseFloat(cart.total) + (parseFloat(existingItem.item.price) * body.quantity)); //update the total price of cart
                let saved = await Order.findOneAndUpdate({cid: query.cid, status: {$lt: 0}}, cart, {new: true});
                return [true, saved];
            } else { //add new item
                let item = await Item.findOne({rid: body.rid, mid: body.mid});
                let total = parseFloat(cart.total) + (parseFloat(item.price) * body.quantity); //update the price
                let order = {
                    item: item._id,
                    quantity: body.quantity,
                    total: (parseFloat(item.price) * body.quantity)
                }
                cart = await Order.findOneAndUpdate({cid: query.cid, rid: body.rid, status: {$lt: 0}}, {$set: {total: total}, $push: {items: order}}, {new: true})
                return [true, cart];
            }
        }
        else { //cart is empty
            let item = await Item.findOne({rid: body.rid, mid: body.mid});
            let total = parseFloat(cart.total) + (parseFloat(item.price) * body.quantity); //update the price
            let order = {
                item: item._id,
                quantity: body.quantity,
                total: (parseFloat(item.price) * body.quantity)
            }
            let newcart = await Order.findOneAndUpdate({cid: query.cid, status: {$lt: 0}},
                {$set: {total: total, rid: body.rid}, $push: {items: order}}, {new: true})
            return [true, newcart];
        }
}

//edit the user shopping cart
export const editCartRepo = async(query, body) => {
    try {
        let exist = await Customer.exists({cid: query.cid});
        if (!exist) {
            return [false, "Customer don't exist"]
        }
        let cart = await Order.findOne({cid: query.cid, status: {$lt: 0}}).populate('items.item');
        if (!cart || cart.items.length < 1) { //create new cart if none exist
            return [false, "Cart is empty"]
        }
        if (cart.items.length > 0 && cart.rid > -1) { //cart is not empty
            const existingItem = cart.items.find(item => item.item.mid === body.item.mid);
            if (existingItem) { //update quantity and price
                let saved;
                if (body.quantity < 1) { //remove item if quantity is 0
                    cart.total = (parseFloat(cart.total) - existingItem.total);
                    if (cart.total <= 0) {
                        cart.rid = -1;
                    }
                    saved = await Order.findOneAndUpdate({cid: query.cid, status: {$lt: 0}}, {$set: {total: cart.total, rid: cart.rid}, $pull: {items: { item: existingItem.item._id }}}, {new: true})
                }
                else { //update item quantity
                    existingItem.quantity = body.quantity; //update quantity
                    cart.total = (parseFloat(cart.total) - existingItem.total); //substract the previous total price for the item
                    existingItem.total = (parseFloat(existingItem.item.price) * body.quantity); //update the price of the existing item
                    cart.total = ((parseFloat(cart.total) +parseFloat(existingItem.total))); //update price
                    saved = await Order.findOneAndUpdate({cid: query.cid, status: {$lt: 0}}, cart, {new: true});
                }
                return [true, saved];
            } else {
                return [false, "Item does not exist"];
            }
        }
    } catch (e) {
        throw Error ("Error while updating cart detail")
    }
}

export const removeItemRepo = async(query, body) => {
    try {
        let cart = await Order.findOne({cid: query.cid, status: {$lt: 0}}).populate('items.item');
        if (!cart) { //create new cart if none exist
            return [false, "Cart is empty"];
        }
        const existingItem = cart.items.find(item => item.item.mid === body.mid);
        if (existingItem) { //update quantity and price
            cart.total = (parseFloat(cart.total) - existingItem.total); //update price
            if (cart.total <= 0) {
                cart.rid = -1;
            }
            //remove item
            let saved = await Order.findOneAndUpdate({cid: query.cid, status: {$lt: 0}}, {$set: {total: cart.total, rid: cart.rid}, $pull: {items: { item: existingItem.item._id }}}, {new: true});
            return [true, saved];
        }
        return [false, "Can't find item in cart"];
    } catch (e) {
        throw Error ("Error while reseting cart");
    }
}

//reset user cart by deleting and making new cart
export const resetCartRepo = async(query) => {
    try {
        let exist = await Customer.exists({cid: query.cid});
        if (!exist) {
            return [false, "Customer don't exist"]
        }
        let removed = await Order.deleteOne({cid: query.cid, status: {$lt: 0}}); //delete cart
        query.total = 0;
        let newcart = await new Order(query).save();
        return [true, newcart];
    } catch (e) {
        throw Error ("Error while reseting cart");
    }
}

//Create new cart and add items from the past order to it
//Will overwritten exisiting cart
export const reOrderRepo = async(query, body) => {
    try {
        let diff = false; //notify if an item(s) is not available
        //retrieve old order information
        let order = await Order.findOne({cid: query.cid, rid: body.rid, order_id: body.order_id, status: {$gt: 2}}).populate('items.item'); //retrieve old order information
        if (!order) {
            return [false, "Unable to retrieve order information", false];
        }
        let cart = await Order.findOne({cid: query.cid, status: {$lt: 0}}).populate("items.item"); //retrieve current cart or make new one if there is none
        if (!cart) { //create new cart if none exist
            cart = await new Order(query).save();
        }
        //filter out item that is set as false
        let filter_items = order.items.filter((item) => item.item.available === true);
        if (filter_items.length != order.items.length) { //check if an item(s) is not available
            diff = true;
        }
        //add information to cart;
        cart.total = getTotal(filter_items);
        cart.items = filter_items;
        //save new cart
        if (cart.items.length < 1) { //cart is empty the rid
            order.rid = -1;
        }
        let saved = await Order.findOneAndUpdate({cid: query.cid, status: {$lt: 0}}, {$set: {items: cart.items, rid: order.rid, total: cart.total}}
            , {new: true}).populate('items.item');
        return [true, saved, diff];
    } catch (e) {
        throw Error ("Error while adding item to cart");
    }
}

//Helper method to get total price for cart
const getTotal= (items) => {
    let total = items.reduce((accumulator, item) => { return accumulator += (item.quantity * (item.item.price * 100))}, 0)
    return parseInt(total);
}
