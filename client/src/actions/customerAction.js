import axios from 'axios';

/*
  Hold all actions for customer and shopping cart related (customer client end methods)
*/
const connection = "http://localhost:8000";

//---------------------------------------Customer Information----------------------------------------
export const getCustomer = async(cid) => {
  try {
    const url = connection + `/customer/${cid}`;
    const { data } = await axios.get(url)
    return data;
  } catch (error) {
    console.error("Error fetching customer info:", error);
    throw error;
  }
}

export const getAllCustomers = async() => {
  try {
    const url = connection + `/`;
    const { data } = await axios.get(url)
    return data;
  } catch (error) {
    console.error("Error fetching customers info:", error);
    throw error;
  }
}

//---------------------------------------Cart Manipulation-------------------------------------------

/**
 * get customer cart
 * @param {*} cid - customer id
 * @returns object containing 3 things: status, success (boolean value), and data
 */
export const getCart = async(cid) => {
  try {
    const url = connection + `/customer/cart/${cid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error resetting cart:", error);
    throw error;
  }
}

/**
 *
 * @param {*} cid: Customer id number
 * @param {*} item: Order object format provide below
 * {
 *    item: string of the object id of the menu item,
 *    quantity: number,
 *    rid: restaurant id number
 * }
 *
 */
export const addToCart = async(cid, item) => {
  try {
    const url = connection + `/customer/cart/add/${cid}`;
    const { data } = await axios.patch(url, item);
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

export const updateCart = async(cid, item, quantity) => {
  try {
    const body = {item: item, quantity: quantity};
    const url = connection + `/customer/cart/edit/${cid}`;
    const { data } = await axios.patch(url, body);
    return data;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
}

/**
 * remove an item from cart
 * @param {*} cid - customer id
 * @param {*} item - object containing just the item _id
 * {
 *  item: string of the object _id
 * }
 * @returns
 */
export const removeFromCart = async(cid, item) => {
  try {
    const url = connection + `/customer/cart/remove/${cid}`;
    const { data } = await axios.delete(url, {data: item});
    return data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
}

/**
 * remove all item from cart
 * @param {*} cid
 * @returns
 */
export const resetCart = async(cid) => {
  try {
    const url = connection + `/customer/cart/${cid}`;
    const { data } = await axios.delete(url);
    return data;
  } catch (error) {
    console.error("Error resetting cart:", error);
    throw error;
  }
}

/**
 * Add item from past order to cart
 * @param {*} cid - customer id
 * @param {*} body - object containing 2 fields: rid and order_id
 * {
 *  rid: restaurant id,
 *  order_id: order id
 * }
 * @returns will return and additional field called diff, if true then some item is no longer available to order
 */
export const reOrder = async(cid, body) => {
  try {
    const url = connection + `/customer/reorder/${cid}`;
    const { data } = await axios.patch(url, body);
    return data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
}

//------------------------------Placing Order and Getting Order history-----------------------------

/**
 * Change customer's cart status to order
 * @param {*} cid
 * @param {*} body - object containing the schedule to indicate when the customer want to pick up the order
 * 0 for Immediate, 1 for Later
 * @returns
 */
export const placeOrder = async(cid, body) => {
  try {
    const url = connection + `/customer/orders/${cid}`;
    console.log(body);
    const { data } = await axios.patch(url, body);
    const result = data.success;
    return result;

  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
}

/**
 * Method for user to set the status of their own order to complete
 * Body is an object containg the order_id.
 * {
 *  order_id: number
 * }
 */
export const completeOrder = async(cid, body) => {
  try {
    const url = connection + `/order/complete/${cid}`;
    const { data } = await axios.patch(url, body);
    return data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}

/**
 * Get all customer orders, including pending order
 * @param {*} cid
 */
export const getAllOrdersP = async(cid) => {
  try {
    const url = connection + `/customer/orders/${cid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error retrieving orders:", error);
    throw error;
  }
}

/**
 * Method for retrieving all completed orders
 * @param {*} cid 
 * @returns 
 */
export const getOrdersHistory = async(cid) => {
  try {
    const url = connection + `/customer/orders/all/${cid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) { 
    console.error("Error retrieving orders:", error);
    throw error;
  }
}

/**
 * retrieve customer's orders by month
 * @param {*} cid - customer id
 * @param {*} body - object holding the month field
 * {
 *    month: number
 * }
 */
export const getOrdersHistoryMonth = async(cid, body) => {
  try {
    const url = connection + `/customer/orders/history/${cid}`;
    const { data } = await axios.get(url, body);
    return data;
  } catch (error) {
    console.error("Error retrieving orders:", error);
    throw error;
  }
}
