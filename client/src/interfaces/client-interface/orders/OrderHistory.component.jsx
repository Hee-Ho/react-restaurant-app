import React from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrdersHistory } from "../../../actions/customerAction";

import Accordion from "react-bootstrap/Accordion";
import OrdersInfo from "./OrderInfoTable.component";

const OrderHistoryList = ({cartItems, setCartItems, quantities, setQuantities}) => {
  const {cid, rid} = useParams();
  let i = 0;

  // Customer orders history
  const { isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["history", cid],
    queryFn: () => getOrdersHistory(cid),
  });

  // Error handling
  if (isError) {
    return <h4>Unable to retrieve list of orders </h4>;
  }

  // Loading message
  if (isLoading) {
    return <h4>Please wait, retrieving orders history </h4>;
  }

  // Convert date to locale
  const convertDate = (date) => {
    let locale = new Date(date);
    return locale.toLocaleDateString();
  };

  // Convert order status
  const convertOrderStatus = (status) => {
    switch (status) {
      case 1:
        return "In-progress";
      case 2:
        return "Awaiting-Pickup";
      case 3:
        return "Completed";
      default:
        return "Ordered";
    }
  };

  // Adds a decimal point to the price
  const getPrice = (num) => {
    return (num / 100).toFixed(2);
  };

  // Add item from past completed order to cart
  const reOrdering = async(order) => {
    const { data } = await axios.patch(`http://localhost:8000/customer/cart/reorder/${cid}`, {order_id: order.order_id, rid: order.rid});
    if (data.success = true) {
      if (data.data.items.length > 0) {
        let new_quantities = {}
        let new_cart = []
        for (var items of data.data.items) {
          new_quantities[items.item.name] = items.quantity;
          new_cart.push(items.item);
        }
        setQuantities(new_quantities);
        setCartItems(new_cart);
      }
    }
  };

  if (isSuccess) {
    if (data.data.length > 0) {
      return (
        <Accordion>
          {data.data.map((order) => (
            <Accordion.Item key={i++} eventKey={i++}>
              <Accordion.Header>
                Restaurant: {order.restaurant.name} &emsp; &emsp; Order ID:{" "}
                {order.order_id} &emsp; &emsp; Date:{" "}
                {convertDate(order.orderAt)} &emsp; &emsp; Order Status:{" "}
                {convertOrderStatus(order.status)}
              </Accordion.Header>
              <Accordion.Body>
                <OrdersInfo order={order.items}>
                  {" "}
                </OrdersInfo>
                <h5>Grand Total: ${getPrice(order.total)}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => reOrdering(order)}
                  >
                  Reorder
                </button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      );
    } else {
      return <h4>No orders record available</h4>;
    }
  }
};

export default OrderHistoryList;
