import axios from "axios";

/*
  Hold all actions for restaurant related methods
  All data fetched from the endpoint contain status, success, and data field.
*/
const connection = "http://localhost:8000";

export const getRestaurant = async (rid) => {
  try {
    const url = connection + `/restaurant/${rid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
};

export const getAllRestaurants = async() => {
  try {
    const url = connection + `/restaurant/restaurants`;
    const { data } = await axios.get(url)
    return data;
  } catch (error) { 
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
}

//------------------------------------Employees---------------------------------------

export const getEmployees = async(rid) => {
  try {
    const url = connection + `/restaurant/employees/${rid}`;
    const { data } = await axios.get(url)
    return data;
  } catch (error) { 
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
}

//--------------------------------Menu Item Manipulation------------------------------

/**
 * Get all menu item for the restaurant (for restaurant side)
 * @param {*} rid
 * @returns
 */
export const getMenu = async (rid) => {
  try {
    const url = connection + `/restaurant/menu/${rid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
};

/**
 * Get all menu item for a restaurant, item that are not available will not be shown
 * @param {*} rid
 * @returns
 */
export const getMenuCustomer = async (rid) => {
  try {
    const url = connection + `/restaurant/menu/customer/${rid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
};

/**
 * Add item to restaurant menu
 * @param {*} rid - restaurant id
 * @param {*} item - object containing item information and worker id to check for authorization
 * {
 *  name: name of the item,
 *  category: 1 = main, 2 = appetizer, 3 = dessert/beverage,
 *  price: float/decimal
 *  wid: id of the worker authorizing
 * }
 */
export const addItem = async (rid, item) => {
  try {
    const url = connection + `/restaurant/menu/${rid}`;
    const { data } = await axios.post(url, item);
    return data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

/**
 * Update existing item in menu using object id
 * @param {*} rid - restaurant id
 * @param {*} item - object holding object id of the item, the worker, price to be change to, status to be change to.
 * format:
 * {
 *  mid: menu item id,
 *  wid: id of the working making the change,
 *  price: the updated price (optional, does not need to be included if wish only to change status)
 *  status: 0 or 1 (change the item availability status, optional if only wish to change the price)
 * }
 */
export const updateItem = async (rid, item) => {
  try {
    const url = connection + `/restaurant/menu/${rid}`;
    const { data } = await axios.patch(url, item);
    return data;
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

/**
 * remove item from restaurant using the item object id
 * @param {*} rid - restaurant id
 * @param {*} item - object holding the item object id
 * {
 *  mid: menu item id,
 *  wid: authorizer
 * }
 * @returns
 */
export const removeItem = async (rid, item) => {
  try {
    const url = connection + `/restaurant/menu/${rid}`;
    const { data } = await axios.delete(url, { data: item });
    return data;
  } catch (error) {
    console.error("Error removing item from inventory:", error);
    throw error;
  }
};

export const getMenuItem = async (rid, mid) => {
  try {
    const url = connection + `/restaurant/menu/${rid}/${mid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error removing item from inventory:", error);
    throw error;
  }
};

//--------------------------------Order Manipulation and History------------------------------

/**
 * For updating order status
 * @param {*} rid - the restaurant id
 * @param {*} body - body holding information to update for an order
 * {
 *  order_id: order id number,
 *  status: status change to the order (1 = In-progress, 2 = awaiting pickup, 3 = complete) (optional)
 *  h: the estimate hour for when order is ready for pick up (24 hours clock) (optional)
 *  m: the estimate minute for when order is ready for pick up
 * }
 */
export const updateOrderStatus = async (rid, body) => {
  try {
    const url = connection + `/restaurant/order/${rid}`;
    const { data } = await axios.patch(url, body);
    return data;
  } catch (error) {
    console.error("Error updating orders:", error);
    throw error;
  }
};

/**
 * Get all pending orders for a restaurant
 * @param {*} rid - restaurant id
 * @returns
 */
export const getOrdersP = async (rid) => {
  try {
    const url = connection + `/restaurant/orders/${rid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant orders:", error);
    throw error;
  }
};

/**
 * Method for retrieving all completed orders
 * @param {*} rid 
 * @returns 
 */
export const getOrdersHistory = async(rid) => {
  try {
    const url = connection + `/restaurant/orders/all/${rid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) { 
    console.error("Error retrieving orders:", error);
    throw error;
  }
}

/**
 * Get order history for a restaurant by month
 * @param {*} rid - restaurant id
 * @param {*} body - object holding the month field
 * {
 *  month: month
 * }
 */
export const getOrderByMonthRes = async (rid, body) => {
  try {
    const url = connection + `/restaurant/orders/history/${rid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant orders:", error);
    throw error;
  }
};

//---------------------------------------------Analytic--------------------------------------------

/**
 * Get total profit from all completed orders
 * @param {*} rid - restaurant id
 */
export const getProfit = async (rid) => {
  try {
    const url = connection + `/restaurant/analytic/profit/${rid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
};

/**
 * Get array of menu item and the amount of time they have been ordered
 * @param {*} rid - restaurant id
 * @returns
 */
export const getPopularItems = async (rid) => {
  try {
    const url = connection + `/restaurant/analytic/items/${rid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
}

/**
 * get array of of order hour and the amount of order receive during that specific hour
 * @param {*} rid - restaurant id
 * @returns 
 */
export const getPopularHours = async(rid) => {
  try {
    const url = connection + `/restaurant/analytic/hours/${rid}`;
    const { data } = await axios.get(url)
    return data;
  } catch (error) { 
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
}